package com.safesweep.app.core

import java.nio.file.Files
import java.nio.file.LinkOption

/**
 * Performs the clean-up the user confirmed. Every item is re-checked right before it is touched:
 *  - it must pass [SafetyGuard] again
 *  - a file must still have exactly the size and timestamp it had when scanned
 *    (if an app wrote to it since, it's skipped)
 *  - an "empty folder" must still be empty (and plain File.delete() refuses non-empty folders anyway)
 */
class Cleaner(private val guard: SafetyGuard, private val trash: Trash) {

    fun clean(items: List<JunkItem>, progress: (done: Int, total: Int) -> Unit = { _, _ -> }): CleanReport {
        var freed = 0L
        var trashed = 0L
        var done = 0
        val failures = ArrayList<Pair<JunkItem, String>>()

        items.forEachIndexed { index, item ->
            progress(index, items.size)
            val f = item.file
            val reason = guard.checkDeletable(f, item.category == Category.LEFTOVER_APP_FOLDERS)
            when {
                reason != null -> failures += item to "Skipped: $reason"
                !Files.exists(f.toPath(), LinkOption.NOFOLLOW_LINKS) -> failures += item to "Already gone"
                item.isDirectory != f.isDirectory -> failures += item to "Skipped: changed since scan"
                !item.isDirectory && (f.length() != item.size || f.lastModified() != item.lastModified) ->
                    failures += item to "Skipped: changed since scan"

                item.category == Category.EMPTY_FOLDERS -> {
                    if (f.listFiles()?.isEmpty() == true && f.delete()) done++
                    else failures += item to "Skipped: folder is no longer empty"
                }

                item.category.useTrash -> {
                    val err = trash.moveIn(f)
                    if (err == null) { trashed += item.size; done++ } else failures += item to err
                }

                else -> { // regenerable cache files only (thumbnails)
                    if (f.isFile && f.delete()) { freed += item.size; done++ }
                    else failures += item to "Could not delete"
                }
            }
        }
        progress(items.size, items.size)
        return CleanReport(freed, trashed, done, failures)
    }
}
