package com.safesweep.app.core

import java.io.File

enum class Category(
    val title: String,
    val description: String,
    /** Pre-ticked after a scan. Only categories that are clearly junk. */
    val selectedByDefault: Boolean,
    /** Move to the recycle bin (restorable for 7 days) instead of deleting outright. */
    val useTrash: Boolean,
) {
    THUMBNAILS(
        "Thumbnail cache",
        "Preview images your gallery made. Android rebuilds them automatically when needed.",
        selectedByDefault = true, useTrash = false,
    ),
    TEMP_FILES(
        "Temporary & log files",
        ".tmp / .log / crash-dump files more than a day old.",
        selectedByDefault = true, useTrash = true,
    ),
    APK_FILES(
        "Installer files (APKs)",
        "App install packages left in your storage. The apps themselves are not affected.",
        selectedByDefault = true, useTrash = true,
    ),
    LEFTOVER_APP_FOLDERS(
        "Leftovers of uninstalled apps",
        "Media folders left behind by apps you have removed. Review before cleaning — could contain old media from that app.",
        selectedByDefault = false, useTrash = true,
    ),
    DUPLICATES(
        "Duplicate files",
        "Byte-for-byte identical copies (verified by SHA-256). One copy of each is always kept and never listed.",
        selectedByDefault = false, useTrash = true,
    ),
    OLD_DOWNLOADS(
        "Old downloads",
        "Files in Download not changed for 90+ days. Your files — review before cleaning.",
        selectedByDefault = false, useTrash = true,
    ),
    LARGE_FILES(
        "Large files",
        "Files over 100 MB. Your files — review before cleaning.",
        selectedByDefault = false, useTrash = true,
    ),
    EMPTY_FOLDERS(
        "Empty folders",
        "Folders with nothing in them. Tidies up but frees almost no space.",
        selectedByDefault = false, useTrash = false,
    );
}

data class JunkItem(
    val file: File,
    val size: Long,
    val lastModified: Long,
    val category: Category,
    val isDirectory: Boolean = false,
    val note: String? = null,
) {
    val path: String get() = file.path
}

data class ScanResult(
    val items: List<JunkItem>,
    val filesScanned: Int,
    val durationMs: Long,
) {
    fun byCategory(): Map<Category, List<JunkItem>> =
        items.groupBy { it.category }.toSortedMap(compareBy { it.ordinal })
}

data class CleanReport(
    val freedNow: Long,
    val movedToTrash: Long,
    val itemsDone: Int,
    val failures: List<Pair<JunkItem, String>>,
)

fun formatBytes(bytes: Long): String {
    if (bytes < 1024) return "$bytes B"
    val units = arrayOf("KB", "MB", "GB", "TB")
    var value = bytes / 1024.0
    var i = 0
    while (value >= 1024 && i < units.lastIndex) {
        value /= 1024.0
        i++
    }
    return if (value >= 100) "%.0f %s".format(value, units[i]) else "%.1f %s".format(value, units[i])
}
