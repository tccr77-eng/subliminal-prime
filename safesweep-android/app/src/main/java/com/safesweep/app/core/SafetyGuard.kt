package com.safesweep.app.core

import java.io.File
import java.io.IOException
import java.nio.file.Files
import java.nio.file.LinkOption

/**
 * The last line of defence. EVERY delete or move SafeSweep performs is checked here first,
 * both when the scan finds a file and again right before it is touched.
 *
 * Layer 1 (Android itself): a normal, non-root app physically cannot write to /system, /data,
 * /vendor, the boot partitions or other apps' private storage. That is what makes bricking
 * impossible, whatever bugs this app might have.
 *
 * Layer 2 (this class), for the shared storage we *can* write to:
 *  - only paths strictly inside the storage root, resolved canonically (no ".." or symlink escapes)
 *  - never follows or deletes through symbolic links
 *  - never the storage root itself, nor standard folders (DCIM, Download, Pictures, ...) themselves
 *  - never anything under Android/ (app data, OBB game data), with one narrow exception:
 *    a leftover Android/media/<package> folder of an app that is no longer installed
 *  - never our own recycle bin (that is managed only by [Trash])
 */
class SafetyGuard(storageRoot: File) {

    val root: File = storageRoot.canonicalFile

    fun isSymlink(f: File): Boolean = try {
        Files.isSymbolicLink(f.toPath())
    } catch (e: Exception) {
        true // if we can't tell, assume the worst
    }

    fun canonicalOrNull(f: File): File? = try {
        f.canonicalFile
    } catch (e: IOException) {
        null
    }

    /** Path of [f] relative to the storage root, or null if it is not strictly inside it. */
    fun relativePath(f: File): String? {
        val c = canonicalOrNull(f) ?: return null
        val rootPath = root.path
        if (!c.path.startsWith(rootPath + File.separator)) return null
        val rel = c.path.substring(rootPath.length + 1)
        return rel.ifEmpty { null }
    }

    fun isInsideRoot(f: File): Boolean = relativePath(f) != null

    /**
     * Returns null when [f] may be deleted/moved, otherwise a human readable reason why not.
     * @param allowLeftoverMediaFolder true only for the "leftover app folder" category.
     */
    fun checkDeletable(f: File, allowLeftoverMediaFolder: Boolean = false): String? {
        if (isSymlink(f)) return "is a symbolic link"
        // Also refuse if any parent directory (inside the root) is a symlink:
        // canonical resolution would otherwise silently redirect us somewhere else.
        val abs = f.absoluteFile
        var p: File? = abs.parentFile
        while (p != null && p.path.length > root.path.length) {
            if (isSymlink(p)) return "is inside a symbolic link"
            p = p.parentFile
        }
        val rel = relativePath(f) ?: return "outside the user storage area"
        val parts = rel.split(File.separatorChar).filter { it.isNotEmpty() }
        if (parts.isEmpty()) return "is the storage root"
        val first = parts[0].lowercase()

        if (first == Trash.DIR_NAME.lowercase()) return "is inside the recycle bin"

        if (first == "android") {
            if (allowLeftoverMediaFolder &&
                parts.size == 3 &&
                parts[1].lowercase() == "media" &&
                looksLikePackageName(parts[2])
            ) return null
            return "is an Android system/app folder"
        }

        if (parts.size == 1 && first in PROTECTED_TOP_LEVEL &&
            Files.isDirectory(f.toPath(), LinkOption.NOFOLLOW_LINKS)
        ) return "is a standard folder"

        return null
    }

    companion object {
        /** Standard top-level folders that must never be removed themselves. */
        val PROTECTED_TOP_LEVEL = setOf(
            "android", "dcim", "pictures", "download", "downloads", "music", "movies",
            "documents", "alarms", "notifications", "ringtones", "podcasts", "audiobooks",
            "recordings", "screenshots", "dcim", "bluetooth"
        )

        private val PACKAGE_RE = Regex("^[A-Za-z][A-Za-z0-9_]*(\\.[A-Za-z0-9_]+)+$")
        fun looksLikePackageName(s: String) = PACKAGE_RE.matches(s)
    }
}
