package com.safesweep.app.core

import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.io.File
import java.nio.file.Files

/**
 * Builds a fake phone storage tree in a temp folder and checks that SafeSweep only ever
 * proposes / touches what it should.
 */
class SafetyTest {

    private lateinit var base: File      // stands in for "/" (things outside storage)
    private lateinit var root: File      // stands in for /storage/emulated/0
    private lateinit var guard: SafetyGuard
    private val day = 24L * 3600 * 1000
    private val now = System.currentTimeMillis()

    @Before
    fun setUp() {
        base = Files.createTempDirectory("safesweep").toFile()
        root = File(base, "sdcard").apply { mkdirs() }
        guard = SafetyGuard(root)
    }

    @After
    fun tearDown() {
        base.deleteRecursivelySafely()
    }

    private fun file(rel: String, bytes: Int = 10, ageDays: Int = 0, content: Byte? = null): File {
        val f = File(root, rel)
        f.parentFile!!.mkdirs()
        val data = ByteArray(bytes) { content ?: (it % 251).toByte() }
        f.writeBytes(data)
        f.setLastModified(now - ageDays * day)
        return f
    }

    // ---------------------------------------------------------------- SafetyGuard

    @Test
    fun guardRejectsOutsideRootAndRoot() {
        val outside = File(base, "system/build.prop").apply { parentFile!!.mkdirs(); writeText("x") }
        assertNotNull(guard.checkDeletable(outside))
        assertNotNull(guard.checkDeletable(root))
        assertNotNull(guard.checkDeletable(File(root, "../system/build.prop")))
        assertNotNull(guard.checkDeletable(File("/system/build.prop")))
        assertNotNull(guard.checkDeletable(File("/data/data")))
    }

    @Test
    fun guardProtectsStandardFoldersAndAndroidDir() {
        for (name in listOf("DCIM", "Download", "Pictures", "Android", "Music")) {
            File(root, name).mkdirs()
            assertNotNull(name, guard.checkDeletable(File(root, name)))
        }
        assertNotNull(guard.checkDeletable(file("Android/data/com.app/cache/x.tmp")))
        assertNotNull(guard.checkDeletable(file("Android/obb/com.game/main.obb")))
        assertNotNull(guard.checkDeletable(file("Android/media/com.app/x.jpg"), allowLeftoverMediaFolder = true))
        File(root, "Android/media/com.gone.app").mkdirs()
        // leftover folder itself: only when explicitly allowed
        assertNotNull(guard.checkDeletable(File(root, "Android/media/com.gone.app")))
        assertNull(guard.checkDeletable(File(root, "Android/media/com.gone.app"), allowLeftoverMediaFolder = true))
        // but files inside standard folders are allowed
        assertNull(guard.checkDeletable(file("Download/old.zip")))
    }

    @Test
    fun guardRejectsSymlinks() {
        val outside = File(base, "precious").apply { mkdirs() }
        File(outside, "keep.txt").writeText("keep")
        val link = File(root, "Download/link")
        link.parentFile!!.mkdirs()
        Files.createSymbolicLink(link.toPath(), outside.toPath())
        assertNotNull(guard.checkDeletable(link))
        assertNotNull(guard.checkDeletable(File(link, "keep.txt")))
    }

    @Test
    fun guardRejectsTrash() {
        assertNotNull(guard.checkDeletable(file(".SafeSweepTrash/1/payload/a.apk")))
    }

    // ---------------------------------------------------------------- Scanner

    private fun scan(installed: Set<String>? = setOf("com.installed")) =
        JunkScanner(guard, installed, now).scan()

    @Test
    fun scannerFindsTheRightThings() {
        file("DCIM/.thumbnails/123.jpg")
        file("Download/app-release.apk")
        file("Download/old-report.pdf", ageDays = 200)
        file("Download/new-report.pdf", ageDays = 1)
        file("Documents/trace.log", ageDays = 3)
        file("Documents/fresh.tmp", ageDays = 0)         // too new: an app may be using it
        File(root, "Empty/inner").mkdirs()
        File(root, "Android/media/com.gone.app/sub").mkdirs()
        file("Android/media/com.gone.app/sub/x.jpg")
        file("Android/media/com.installed/y.jpg")
        file("Android/data/com.app/cache/z.tmp", ageDays = 10)
        file(".hidden/backup.tmp", ageDays = 10)
        file("WhatsApp/.Shared/thing.log", ageDays = 10)

        val r = scan()
        fun cat(c: Category) = r.items.filter { it.category == c }.map { it.file.relativeTo(root).path }.sorted()

        assertEquals(listOf("DCIM/.thumbnails/123.jpg"), cat(Category.THUMBNAILS))
        assertEquals(listOf("Download/app-release.apk"), cat(Category.APK_FILES))
        assertEquals(listOf("Download/old-report.pdf"), cat(Category.OLD_DOWNLOADS))
        assertEquals(listOf("Documents/trace.log"), cat(Category.TEMP_FILES))
        assertEquals(listOf("Empty/inner"), cat(Category.EMPTY_FOLDERS))
        assertEquals(listOf("Android/media/com.gone.app"), cat(Category.LEFTOVER_APP_FOLDERS))

        val all = r.items.map { it.file.relativeTo(root).path }
        assertFalse(all.any { it.startsWith("Android/data") })
        assertFalse(all.any { it.contains("com.installed") })
        assertFalse(all.any { it.startsWith(".hidden") })
        assertFalse(all.any { it.contains(".Shared") })
        assertFalse(all.contains("Documents/fresh.tmp"))
        assertFalse(all.contains("Download/new-report.pdf"))
    }

    @Test
    fun leftoversSkippedWhenInstalledAppsUnknown() {
        File(root, "Android/media/com.gone.app").mkdirs()
        file("Android/media/com.gone.app/x.jpg")
        assertTrue(scan(installed = null).items.none { it.category == Category.LEFTOVER_APP_FOLDERS })
    }

    @Test
    fun duplicatesKeepOneCopyPreferringCamera() {
        val size = 600 * 1024
        file("DCIM/Camera/IMG_1.jpg", size, ageDays = 5, content = 7)
        file("Download/IMG_1 (1).jpg", size, ageDays = 1, content = 7)
        file("Documents/IMG_1 copy.jpg", size, ageDays = 9, content = 7)
        file("Documents/different.jpg", size, ageDays = 9, content = 8) // same size, different bytes

        val dups = scan().items.filter { it.category == Category.DUPLICATES }.map { it.file.relativeTo(root).path }.sorted()
        assertEquals(listOf("Documents/IMG_1 copy.jpg", "Download/IMG_1 (1).jpg"), dups)
    }

    @Test
    fun scannerDoesNotFollowSymlinks() {
        val outside = File(base, "outside").apply { mkdirs() }
        File(outside, "secret.apk").writeText("x")
        Files.createSymbolicLink(File(root, "linkdir").toPath(), outside.toPath())
        assertTrue(scan().items.none { it.file.name == "secret.apk" })
    }

    @Test
    fun scanNeverModifiesAnything() {
        val f = file("Download/a.apk")
        File(root, "EmptyDir").mkdirs()
        scan()
        assertTrue(f.exists())
        assertTrue(File(root, "EmptyDir").exists())
    }

    // ---------------------------------------------------------------- Cleaner + Trash

    @Test
    fun cleanMovesToTrashAndRestoreWorks() {
        val apk = file("Download/app.apk", 1234)
        val thumb = file("DCIM/.thumbnails/1.jpg", 50)
        val r = scan()
        val trash = Trash(guard)
        val rep = Cleaner(guard, trash).clean(r.items.filter {
            it.category == Category.APK_FILES || it.category == Category.THUMBNAILS
        })
        assertEquals(2, rep.itemsDone)
        assertEquals(50L, rep.freedNow)
        assertEquals(1234L, rep.movedToTrash)
        assertFalse(apk.exists())
        assertFalse(thumb.exists())

        val entries = trash.list()
        assertEquals(1, entries.size)
        assertNull(trash.restore(entries[0]))
        assertTrue(apk.exists())
        assertEquals(1234L, apk.length())
        assertTrue(trash.list().isEmpty())
    }

    @Test
    fun cleanSkipsFilesChangedSinceScan() {
        val apk = file("Download/app.apk", 100)
        val items = scan().items.filter { it.category == Category.APK_FILES }
        apk.writeBytes(ByteArray(200)) // an app rewrote it after the scan
        val rep = Cleaner(guard, Trash(guard)).clean(items)
        assertEquals(0, rep.itemsDone)
        assertEquals(1, rep.failures.size)
        assertTrue(apk.exists())
    }

    @Test
    fun cleanRefusesTamperedItems() {
        // Even if a bad item somehow reached the cleaner, the guard stops it.
        val sys = File(base, "system/framework.jar").apply { parentFile!!.mkdirs(); writeText("x") }
        val data = file("Android/data/com.bank/files/keys.db")
        val dcim = File(root, "DCIM").apply { mkdirs() }
        val evil = listOf(
            JunkItem(sys, sys.length(), sys.lastModified(), Category.THUMBNAILS),
            JunkItem(data, data.length(), data.lastModified(), Category.TEMP_FILES),
            JunkItem(dcim, 0, dcim.lastModified(), Category.EMPTY_FOLDERS, isDirectory = true),
            JunkItem(root, 0, root.lastModified(), Category.LEFTOVER_APP_FOLDERS, isDirectory = true),
        )
        val rep = Cleaner(guard, Trash(guard)).clean(evil)
        assertEquals(0, rep.itemsDone)
        assertTrue(sys.exists()); assertTrue(data.exists()); assertTrue(dcim.exists())
    }

    @Test
    fun emptyFolderThatGainedContentIsKept() {
        val d = File(root, "Stuff/empty").apply { mkdirs() }
        val items = scan().items.filter { it.category == Category.EMPTY_FOLDERS }
        File(d, "new.txt").writeText("hi")
        val rep = Cleaner(guard, Trash(guard)).clean(items)
        assertEquals(0, rep.itemsDone)
        assertTrue(File(d, "new.txt").exists())
    }

    @Test
    fun trashPurgesOnlyExpiredEntries() {
        val trash = Trash(guard)
        val a = file("Download/a.bin", 10)
        val b = file("Download/b.bin", 20)
        assertNull(trash.moveIn(a, now - 8 * day))
        assertNull(trash.moveIn(b, now))
        assertEquals(10L, trash.purgeExpired(now))
        assertEquals(listOf("b.bin"), trash.list().map { it.payload.name })
    }

    @Test
    fun restoreDoesNotOverwriteExistingFile() {
        val trash = Trash(guard)
        val a = file("Download/a.txt", 10)
        assertNull(trash.moveIn(a))
        file("Download/a.txt", 99) // a new file appeared with the same name
        assertNull(trash.restore(trash.list().first()))
        assertEquals(99L, File(root, "Download/a.txt").length())
        assertEquals(10L, File(root, "Download/a (restored).txt").length())
    }

    @Test
    fun safeRecursiveDeleteDoesNotFollowLinks() {
        val outside = File(base, "keepme").apply { mkdirs() }
        val keep = File(outside, "k.txt").apply { writeText("k") }
        val d = File(root, "x").apply { mkdirs() }
        Files.createSymbolicLink(File(d, "l").toPath(), outside.toPath())
        d.deleteRecursivelySafely()
        assertTrue(keep.exists())
        assertFalse(d.exists())
    }
}
