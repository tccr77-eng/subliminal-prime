package com.safesweep.app.core

import java.io.File
import java.io.FileInputStream
import java.security.MessageDigest

/**
 * Walks shared storage and sorts candidates into [Category]s. Scanning NEVER modifies anything.
 *
 * Conservative rules:
 *  - Android/ is not walked (app data, OBB game files, app media). Only the names of folders
 *    directly in Android/media are compared against installed apps, to find leftovers.
 *  - Hidden folders (".something") are not walked, except gallery ".thumbnails" caches,
 *    because apps often keep private data there.
 *  - Symbolic links are never followed.
 *  - Every candidate is also passed through [SafetyGuard.checkDeletable].
 */
class JunkScanner(
    private val guard: SafetyGuard,
    /** Installed package names, or null if unknown (then leftover detection is skipped). */
    private val installedPackages: Set<String>?,
    private val now: Long = System.currentTimeMillis(),
    private val config: Config = Config(),
    /** Optional: returns a note for an APK file, e.g. "already installed". */
    private val apkNote: (File) -> String? = { null },
) {
    data class Config(
        val largeFileBytes: Long = 100L * 1024 * 1024,
        val oldDownloadDays: Int = 90,
        val tempMinAgeHours: Int = 24,
        val duplicateMinBytes: Long = 512L * 1024,
        val duplicateMaxBytes: Long = 2L * 1024 * 1024 * 1024,
        val maxDepth: Int = 30,
    )

    private class Entry(val file: File, val rel: String, val size: Long, val mtime: Long)

    private val files = ArrayList<Entry>()
    private val emptyDirs = ArrayList<File>()
    private var scanned = 0

    fun scan(
        progress: (filesScanned: Int, current: String) -> Unit = { _, _ -> },
        isCancelled: () -> Boolean = { false },
    ): ScanResult {
        val start = System.currentTimeMillis()
        val items = ArrayList<JunkItem>()

        walk(guard.root, "", 0, progress, isCancelled)
        if (isCancelled()) return ScanResult(emptyList(), scanned, 0)

        // ---- per-file categories (first match wins) -----------------------------------
        val dupCandidates = ArrayList<Entry>()
        val provisional = HashMap<String, JunkItem>() // path -> large/old item (may be replaced by duplicate)
        val dayMs = 24L * 3600 * 1000
        for (e in files) {
            val relLower = e.rel.lowercase()
            val name = e.file.name.lowercase()
            val ext = name.substringAfterLast('.', "")
            val ageMs = now - e.mtime

            if (isThumbnailPath(relLower)) {
                items += JunkItem(e.file, e.size, e.mtime, Category.THUMBNAILS); continue
            }
            if (isInHiddenDir(relLower) || name.startsWith(".")) continue

            if (ext in APK_EXT) {
                items += JunkItem(e.file, e.size, e.mtime, Category.APK_FILES, note = apkNote(e.file)); continue
            }
            if (ext in TEMP_EXT && ageMs > config.tempMinAgeHours * 3600L * 1000) {
                items += JunkItem(e.file, e.size, e.mtime, Category.TEMP_FILES); continue
            }
            if (e.size in config.duplicateMinBytes..config.duplicateMaxBytes) dupCandidates += e
            if (relLower.startsWith("download/") && ageMs > config.oldDownloadDays * dayMs) {
                provisional[e.file.path] = JunkItem(e.file, e.size, e.mtime, Category.OLD_DOWNLOADS,
                    note = "${ageMs / dayMs} days old")
            } else if (e.size >= config.largeFileBytes) {
                provisional[e.file.path] = JunkItem(e.file, e.size, e.mtime, Category.LARGE_FILES)
            }
        }

        // ---- duplicates: same size -> same first 64 KB -> same full SHA-256 --------------
        progress(scanned, "Checking for duplicates…")
        for (group in findDuplicates(dupCandidates, isCancelled)) {
            val keeper = group.sortedWith(
                compareByDescending<Entry> { isCameraFolder(it.rel.lowercase()) }
                    .thenBy { it.mtime }
                    .thenBy { it.rel.length }
            ).first()
            for (e in group) if (e !== keeper) {
                provisional.remove(e.file.path)
                items += JunkItem(e.file, e.size, e.mtime, Category.DUPLICATES,
                    note = "Copy of ${keeper.rel}")
            }
        }
        if (isCancelled()) return ScanResult(emptyList(), scanned, 0)
        items += provisional.values

        // ---- leftovers of uninstalled apps in Android/media -----------------------------
        if (installedPackages != null) {
            val media = File(guard.root, "Android/media")
            media.listFiles()?.forEach { d ->
                if (d.isDirectory && !guard.isSymlink(d) &&
                    SafetyGuard.looksLikePackageName(d.name) && d.name !in installedPackages
                ) {
                    val size = sizeOf(d, guard)
                    items += JunkItem(d, size, d.lastModified(), Category.LEFTOVER_APP_FOLDERS,
                        isDirectory = true, note = "App \"${d.name}\" is not installed")
                }
            }
        }

        // ---- empty folders ----------------------------------------------------------------
        for (d in emptyDirs) items += JunkItem(d, 0, d.lastModified(), Category.EMPTY_FOLDERS, isDirectory = true)

        // ---- final safety filter --------------------------------------------------------
        val safe = items.filter {
            guard.checkDeletable(it.file, it.category == Category.LEFTOVER_APP_FOLDERS) == null
        }.sortedByDescending { it.size }

        return ScanResult(safe, scanned, System.currentTimeMillis() - start)
    }

    private fun walk(
        dir: File, rel: String, depth: Int,
        progress: (Int, String) -> Unit, isCancelled: () -> Boolean,
    ) {
        if (depth > config.maxDepth || isCancelled()) return
        val children = dir.listFiles() ?: return // unreadable: skip, never guess
        if (children.isEmpty()) {
            if (depth > 0 && !isInHiddenDir(rel.lowercase() + "/")) emptyDirs += dir
            return
        }
        for (c in children) {
            if (guard.isSymlink(c)) continue
            val childRel = if (rel.isEmpty()) c.name else "$rel/${c.name}"
            val lower = childRel.lowercase()
            if (c.isDirectory) {
                if (depth == 0 && (lower == "android" || lower == Trash.DIR_NAME.lowercase())) continue
                if (c.name.startsWith(".") && !THUMB_DIR_RE.matches(lower)) continue
                walk(c, childRel, depth + 1, progress, isCancelled)
            } else if (c.isFile) {
                files += Entry(c, childRel, c.length(), c.lastModified())
                scanned++
                if (scanned % 200 == 0) progress(scanned, childRel)
            }
        }
    }

    private fun findDuplicates(candidates: List<Entry>, isCancelled: () -> Boolean): List<List<Entry>> {
        val result = ArrayList<List<Entry>>()
        val bySize = candidates.groupBy { it.size }.values.filter { it.size > 1 }
        for (sameSize in bySize) {
            if (isCancelled()) break
            val byHead = sameSize.groupBy { hash(it.file, HEAD_BYTES) }.filterKeys { it != null }.values
            for (sameHead in byHead) {
                if (sameHead.size < 2) continue
                val byFull = sameHead.groupBy { hash(it.file, Long.MAX_VALUE) }.filterKeys { it != null }.values
                byFull.filter { it.size > 1 }.forEach { result += it }
            }
        }
        return result
    }

    private fun hash(f: File, limit: Long): String? = try {
        val md = MessageDigest.getInstance("SHA-256")
        FileInputStream(f).use { input ->
            val buf = ByteArray(64 * 1024)
            var total = 0L
            while (total < limit) {
                val n = input.read(buf, 0, minOf(buf.size.toLong(), limit - total).toInt())
                if (n <= 0) break
                md.update(buf, 0, n)
                total += n
            }
        }
        md.digest().joinToString("") { "%02x".format(it) }
    } catch (e: Exception) {
        null // unreadable files are never reported as duplicates
    }

    companion object {
        private const val HEAD_BYTES = 64L * 1024
        val APK_EXT = setOf("apk", "apks", "xapk", "apkm")
        val TEMP_EXT = setOf("tmp", "temp", "log", "dmp")
        private val THUMB_RE = Regex("^(dcim|pictures|movies|music)/\\.thumbnails/.+")
        private val THUMB_DIR_RE = Regex("^(dcim|pictures|movies|music)/\\.thumbnails(/.*)?$")

        fun isThumbnailPath(relLower: String) = THUMB_RE.matches(relLower)

        /** True if any folder in the path starts with '.', ignoring thumbnail caches. */
        fun isInHiddenDir(relLower: String): Boolean {
            if (isThumbnailPath(relLower)) return false
            val segments = relLower.split('/')
            return segments.dropLast(1).any { it.startsWith(".") }
        }

        fun isCameraFolder(relLower: String) =
            relLower.startsWith("dcim/") || relLower.startsWith("pictures/")
    }
}
