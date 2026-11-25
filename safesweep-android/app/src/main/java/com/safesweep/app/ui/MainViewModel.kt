package com.safesweep.app.ui

import android.app.ActivityManager
import android.app.Application
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import android.os.Environment
import android.os.StatFs
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.core.content.ContextCompat
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.safesweep.app.core.AppAnalyzer
import com.safesweep.app.core.AppInfo
import com.safesweep.app.core.CleanReport
import com.safesweep.app.core.Cleaner
import com.safesweep.app.core.JunkItem
import com.safesweep.app.core.JunkScanner
import com.safesweep.app.core.SafetyGuard
import com.safesweep.app.core.ScanResult
import com.safesweep.app.core.Trash
import com.safesweep.app.core.TrashEntry
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

data class StorageInfo(val total: Long, val free: Long, val ramTotal: Long, val ramAvail: Long)

class MainViewModel(app: Application) : AndroidViewModel(app) {

    private val ctx: Context get() = getApplication()
    private val guard = SafetyGuard(Environment.getExternalStorageDirectory())
    private val trash = Trash(guard)

    var storageAccess by mutableStateOf(false); private set
    var usageAccess by mutableStateOf(false); private set
    var storage by mutableStateOf<StorageInfo?>(null); private set

    // scan / clean
    var scanning by mutableStateOf(false); private set
    val scanProgress = MutableStateFlow(0 to "")
    var result by mutableStateOf<ScanResult?>(null); private set
    val selected = mutableStateMapOf<String, Boolean>()
    var cleaning by mutableStateOf(false); private set
    var report by mutableStateOf<CleanReport?>(null)
    private var scanJob: Job? = null

    // apps
    var apps by mutableStateOf<List<AppInfo>?>(null); private set
    var appsLoading by mutableStateOf(false); private set

    // recycle bin
    var trashEntries by mutableStateOf<List<TrashEntry>>(emptyList()); private set
    var message by mutableStateOf<String?>(null)

    fun refreshPermissionsAndStats() {
        storageAccess = if (Build.VERSION.SDK_INT >= 30) Environment.isExternalStorageManager()
        else ContextCompat.checkSelfPermission(ctx, android.Manifest.permission.WRITE_EXTERNAL_STORAGE) ==
                PackageManager.PERMISSION_GRANTED
        usageAccess = AppAnalyzer.hasUsageAccess(ctx)
        val st = StatFs(Environment.getDataDirectory().path)
        val am = ctx.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        val mi = ActivityManager.MemoryInfo().also { am.getMemoryInfo(it) }
        storage = StorageInfo(st.totalBytes, st.availableBytes, mi.totalMem, mi.availMem)
        if (storageAccess) viewModelScope.launch {
            withContext(Dispatchers.IO) { trash.purgeExpired() }
            loadTrash()
        }
    }

    fun scan() {
        if (scanning || !storageAccess) return
        report = null
        scanning = true
        scanJob = viewModelScope.launch {
            val r = withContext(Dispatchers.IO) {
                val pm = ctx.packageManager
                val installed = runCatching { AppAnalyzer.installedPackageNames(ctx) }.getOrNull()
                val job = coroutineContext
                JunkScanner(
                    guard = guard,
                    installedPackages = installed,
                    apkNote = { f -> apkNote(pm, f, installed) },
                ).scan(
                    progress = { n, cur -> scanProgress.value = n to cur },
                    isCancelled = { !job.isActive },
                )
            }
            result = r
            selected.clear()
            r.items.forEach { selected[it.path] = it.category.selectedByDefault }
            scanning = false
        }
    }

    fun cancelScan() {
        scanJob?.cancel()
        scanning = false
    }

    private fun apkNote(pm: PackageManager, f: java.io.File, installed: Set<String>?): String? {
        val info = runCatching { pm.getPackageArchiveInfo(f.path, 0) }.getOrNull() ?: return "Damaged / incomplete"
        return if (installed?.contains(info.packageName) == true) "App already installed" else "App not installed"
    }

    fun selectedItems(): List<JunkItem> = result?.items?.filter { selected[it.path] == true }.orEmpty()

    fun clean() {
        val items = selectedItems()
        if (items.isEmpty() || cleaning) return
        cleaning = true
        viewModelScope.launch {
            val rep = withContext(Dispatchers.IO) { Cleaner(guard, trash).clean(items) }
            val failedPaths = rep.failures.map { it.first.path }.toSet()
            result = result?.let { r ->
                r.copy(items = r.items.filter { it.path in failedPaths || selected[it.path] != true })
            }
            items.forEach { if (it.path !in failedPaths) selected.remove(it.path) }
            report = rep
            cleaning = false
            refreshPermissionsAndStats()
        }
    }

    fun loadApps() {
        if (appsLoading) return
        appsLoading = true
        viewModelScope.launch {
            apps = withContext(Dispatchers.IO) { runCatching { AppAnalyzer.loadApps(ctx) }.getOrDefault(emptyList()) }
            appsLoading = false
        }
    }

    fun loadTrash() {
        viewModelScope.launch { trashEntries = withContext(Dispatchers.IO) { trash.list() } }
    }

    fun restore(e: TrashEntry) = viewModelScope.launch {
        val err = withContext(Dispatchers.IO) { trash.restore(e) }
        message = err?.let { "Could not restore: $it" } ?: "Restored to ${e.originalPath}"
        loadTrash()
    }

    fun deleteForever(e: TrashEntry) = viewModelScope.launch {
        withContext(Dispatchers.IO) { trash.delete(e) }
        loadTrash(); refreshPermissionsAndStats()
    }

    fun emptyTrash() = viewModelScope.launch {
        withContext(Dispatchers.IO) { trash.list().forEach { trash.delete(it) } }
        message = "Recycle bin emptied"
        loadTrash(); refreshPermissionsAndStats()
    }
}
