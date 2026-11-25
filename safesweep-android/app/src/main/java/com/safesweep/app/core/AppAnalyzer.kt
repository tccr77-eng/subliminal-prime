package com.safesweep.app.core

import android.app.AppOpsManager
import android.app.usage.StorageStatsManager
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.os.Build
import android.os.Process
import android.os.storage.StorageManager

data class AppInfo(
    val packageName: String,
    val label: String,
    val isSystem: Boolean,
    val appBytes: Long,
    val dataBytes: Long,
    val cacheBytes: Long,
    /** 0 = no usage recorded in the period Android keeps. */
    val lastUsed: Long,
    val installedAt: Long,
)

/** Read-only look at installed apps. It never changes anything itself. */
object AppAnalyzer {

    fun hasUsageAccess(ctx: Context): Boolean {
        val ops = ctx.getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
        val mode = if (Build.VERSION.SDK_INT >= 29) {
            ops.unsafeCheckOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, Process.myUid(), ctx.packageName)
        } else {
            @Suppress("DEPRECATION")
            ops.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, Process.myUid(), ctx.packageName)
        }
        return mode == AppOpsManager.MODE_ALLOWED
    }

    fun installedPackageNames(ctx: Context): Set<String> =
        @Suppress("DEPRECATION")
        ctx.packageManager.getInstalledApplications(0).map { it.packageName }.toSet()

    fun loadApps(ctx: Context): List<AppInfo> {
        val pm = ctx.packageManager
        val usage = hasUsageAccess(ctx)
        val now = System.currentTimeMillis()

        val lastUsedMap: Map<String, Long> = if (usage) {
            val usm = ctx.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
            runCatching {
                usm.queryAndAggregateUsageStats(now - 365L * 24 * 3600 * 1000, now)
                    .mapValues { it.value.lastTimeUsed }
            }.getOrDefault(emptyMap())
        } else emptyMap()

        val ssm = ctx.getSystemService(Context.STORAGE_STATS_SERVICE) as StorageStatsManager
        val user = Process.myUserHandle()

        @Suppress("DEPRECATION")
        val apps = pm.getInstalledApplications(0)
        return apps.filter { it.packageName != ctx.packageName }.map { ai ->
            val stats = if (usage) runCatching {
                ssm.queryStatsForPackage(StorageManager.UUID_DEFAULT, ai.packageName, user)
            }.getOrNull() else null
            val installedAt = runCatching {
                @Suppress("DEPRECATION")
                pm.getPackageInfo(ai.packageName, 0).firstInstallTime
            }.getOrDefault(0L)
            AppInfo(
                packageName = ai.packageName,
                label = runCatching { pm.getApplicationLabel(ai).toString() }.getOrDefault(ai.packageName),
                isSystem = (ai.flags and ApplicationInfo.FLAG_SYSTEM) != 0,
                appBytes = stats?.appBytes ?: 0,
                dataBytes = stats?.dataBytes ?: 0,
                cacheBytes = stats?.cacheBytes ?: 0,
                lastUsed = lastUsedMap[ai.packageName] ?: 0L,
                installedAt = installedAt,
            )
        }
    }

    fun hasLauncherEntry(pm: PackageManager, pkg: String): Boolean =
        pm.getLaunchIntentForPackage(pkg) != null
}
