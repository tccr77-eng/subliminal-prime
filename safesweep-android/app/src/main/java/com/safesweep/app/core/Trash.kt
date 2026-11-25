package com.safesweep.app.core

import java.io.File
import java.nio.file.Files
import java.nio.file.LinkOption

data class TrashEntry(
    val entryDir: File,
    val payload: File,
    val originalPath: String,
    val trashedAt: Long,
    val size: Long,
    val isDirectory: Boolean,
)

/**
 * A recycle bin on the same storage volume. Moving a file in is an instant rename (no copying),
 * and anything in here can be put back exactly where it came from for [RETENTION_DAYS] days.
 *
 * Layout:  <root>/.SafeSweepTrash/<id>/origin.txt   (original absolute path + timestamp)
 *          <root>/.SafeSweepTrash/<id>/payload/<original name>
 *
 * If a move fails for any reason, the file is left where it is. We never "fall back" to deleting.
 */
class Trash(private val guard: SafetyGuard) {

    val dir: File = File(guard.root, DIR_NAME)
    private var counter = 0

    private fun ensureDir(): Boolean {
        if (!dir.exists() && !dir.mkdirs()) return false
        val nomedia = File(dir, ".nomedia") // keeps trashed photos out of the gallery
        if (!nomedia.exists()) runCatching { nomedia.createNewFile() }
        return dir.isDirectory && !guard.isSymlink(dir)
    }

    /** Moves [f] into the bin. Returns null on success, otherwise the reason it was left alone. */
    @Synchronized
    fun moveIn(f: File, now: Long = System.currentTimeMillis()): String? {
        if (!ensureDir()) return "could not create recycle bin"
        val id = "${now}_${counter++}"
        val entryDir = File(dir, id)
        val payloadDir = File(entryDir, "payload")
        if (!payloadDir.mkdirs()) return "could not create recycle bin entry"
        val origin = File(entryDir, ORIGIN_FILE)
        try {
            origin.writeText("${f.absolutePath}\n$now\n")
        } catch (e: Exception) {
            entryDir.deleteRecursivelySafely(); return "could not write recycle bin record"
        }
        val target = File(payloadDir, f.name)
        val moved = f.renameTo(target)
        if (!moved) {
            entryDir.deleteRecursivelySafely()
            return "could not move to recycle bin (file left untouched)"
        }
        return null
    }

    fun list(): List<TrashEntry> {
        val children = dir.listFiles() ?: return emptyList()
        return children.filter { it.isDirectory && !guard.isSymlink(it) }.mapNotNull { e ->
            val lines = runCatching { File(e, ORIGIN_FILE).readLines() }.getOrNull() ?: return@mapNotNull null
            val payload = File(e, "payload").listFiles()?.firstOrNull() ?: return@mapNotNull null
            TrashEntry(
                entryDir = e,
                payload = payload,
                originalPath = lines.getOrNull(0) ?: return@mapNotNull null,
                trashedAt = lines.getOrNull(1)?.toLongOrNull() ?: e.lastModified(),
                size = sizeOf(payload, guard),
                isDirectory = payload.isDirectory,
            )
        }.sortedByDescending { it.trashedAt }
    }

    /** Puts an entry back where it came from. Returns null on success, else the reason. */
    fun restore(entry: TrashEntry): String? {
        if (!isInsideBin(entry.entryDir)) return "not a recycle bin entry"
        var dest = File(entry.originalPath)
        if (!guard.isInsideRoot(dest)) return "original location is outside user storage"
        dest.parentFile?.let { if (!it.exists() && !it.mkdirs()) return "could not recreate original folder" }
        if (dest.exists()) {
            val base = dest.nameWithoutExtension
            val ext = dest.extension.let { if (it.isEmpty()) "" else ".$it" }
            var n = 1
            while (dest.exists()) {
                dest = File(dest.parentFile, "$base (restored${if (n > 1) " $n" else ""})$ext"); n++
            }
        }
        if (!entry.payload.renameTo(dest)) return "could not move file back"
        entry.entryDir.deleteRecursivelySafely()
        return null
    }

    fun delete(entry: TrashEntry): Boolean {
        if (!isInsideBin(entry.entryDir)) return false
        return entry.entryDir.deleteRecursivelySafely()
    }

    /** Permanently removes entries older than the retention period. Returns bytes freed. */
    fun purgeExpired(now: Long = System.currentTimeMillis()): Long {
        val cutoff = now - RETENTION_DAYS * 24L * 3600 * 1000
        var freed = 0L
        for (e in list()) if (e.trashedAt < cutoff) {
            val s = e.size
            if (delete(e)) freed += s
        }
        return freed
    }

    private fun isInsideBin(f: File): Boolean {
        val c = guard.canonicalOrNull(f) ?: return false
        val b = guard.canonicalOrNull(dir) ?: return false
        return c.path.startsWith(b.path + File.separator) && !guard.isSymlink(f)
    }

    companion object {
        const val DIR_NAME = ".SafeSweepTrash"
        const val ORIGIN_FILE = "origin.txt"
        const val RETENTION_DAYS = 7
    }
}

/** Recursive delete that never follows symbolic links (a link is removed, its target is not). */
fun File.deleteRecursivelySafely(): Boolean {
    val path = toPath()
    if (Files.isDirectory(path, LinkOption.NOFOLLOW_LINKS)) {
        listFiles()?.forEach { it.deleteRecursivelySafely() }
    }
    return delete() || !Files.exists(path, LinkOption.NOFOLLOW_LINKS)
}

/** Size of a file or directory tree, never following symbolic links. */
fun sizeOf(f: File, guard: SafetyGuard, maxDepth: Int = 40): Long {
    if (guard.isSymlink(f)) return 0
    if (f.isFile) return f.length()
    if (maxDepth <= 0) return 0
    return f.listFiles()?.sumOf { sizeOf(it, guard, maxDepth - 1) } ?: 0
}
