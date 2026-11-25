package com.safesweep.app.ui

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.safesweep.app.core.AppAnalyzer
import com.safesweep.app.core.AppInfo
import com.safesweep.app.core.formatBytes

private const val DAY = 24L * 3600 * 1000
private val FILTERS = listOf("Biggest caches", "Unused 30+ days", "Pre-installed")

@Composable
fun AppsScreen(vm: MainViewModel, modifier: Modifier) {
    val ctx = LocalContext.current
    var filter by rememberSaveable { mutableIntStateOf(0) }
    LaunchedEffect(vm.usageAccess) { vm.loadApps() }
    val now = System.currentTimeMillis()

    val apps = vm.apps.orEmpty()
    val shown: List<AppInfo> = when (filter) {
        0 -> apps.filter { it.cacheBytes > 0 }.sortedByDescending { it.cacheBytes }
        1 -> apps.filter {
            !it.isSystem && now - it.installedAt > 30 * DAY &&
                (it.lastUsed == 0L || now - it.lastUsed > 30 * DAY)
        }.sortedByDescending { it.appBytes + it.dataBytes + it.cacheBytes }
        else -> apps.filter { it.isSystem && AppAnalyzer.hasLauncherEntry(ctx.packageManager, it.packageName) }
            .sortedBy { it.label.lowercase() }
    }

    LazyColumn(
        modifier = modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        if (!vm.usageAccess) item {
            InfoCard(
                title = "Allow Usage access",
                body = "Lets SafeSweep READ each app's cache size and when you last used it. " +
                    "It's read-only: it can't change or stop any app.",
                button = "Open Usage access settings",
            ) { ctx.openUsageAccess() }
        }

        item {
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.horizontalScroll(rememberScrollState()),
            ) {
                FILTERS.forEachIndexed { i, label ->
                    FilterChip(selected = filter == i, onClick = { filter = i }, label = { Text(label) })
                }
            }
        }

        item {
            Text(
                when (filter) {
                    0 -> "Total app cache: ${formatBytes(apps.sumOf { it.cacheBytes })}. Android doesn't let any app " +
                        "wipe another app's cache directly — use \"Clear all apps' caches\" on the Clean tab, " +
                        "or tap an app and choose Storage → Clear cache. (Never \"Clear storage\" unless you " +
                        "want to reset that app.)"
                    1 -> "Apps you installed but haven't opened in 30+ days. Uninstalling always goes through " +
                        "Android's own confirmation. System apps are never listed here."
                    else -> "Apps that came with the phone. If you never use one, open App info and tap Disable " +
                        "(if offered). Android only offers Disable for apps that are safe to switch off, and you " +
                        "can re-enable them any time. SafeSweep never removes these itself."
                },
                style = MaterialTheme.typography.bodySmall,
            )
        }

        if (vm.appsLoading && vm.apps == null) item {
            Box(Modifier.fillMaxWidth().padding(32.dp), contentAlignment = Alignment.Center) { CircularProgressIndicator() }
        } else if (shown.isEmpty()) item {
            Text(if (filter == 1 && !vm.usageAccess) "Needs Usage access to know which apps you use." else "Nothing here.")
        }

        items(shown, key = { it.packageName }) { app ->
            Card(Modifier.fillMaxWidth()) {
                Column(Modifier.padding(12.dp)) {
                    Text(app.label, fontWeight = FontWeight.SemiBold, maxLines = 1, overflow = TextOverflow.Ellipsis)
                    Text(app.packageName, style = MaterialTheme.typography.bodySmall, maxLines = 1,
                        overflow = TextOverflow.Ellipsis, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    if (vm.usageAccess) {
                        Text(
                            "Cache ${formatBytes(app.cacheBytes)} · App ${formatBytes(app.appBytes)} · Data ${formatBytes(app.dataBytes)}",
                            style = MaterialTheme.typography.bodySmall,
                        )
                        Text(
                            if (app.lastUsed == 0L) "No use recorded recently"
                            else "Last used ${(now - app.lastUsed) / DAY} days ago",
                            style = MaterialTheme.typography.bodySmall,
                        )
                    }
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        TextButton(onClick = { ctx.openAppInfo(app.packageName) }) {
                            Text(if (filter == 0) "Clear cache…" else "App info")
                        }
                        if (filter == 1 && !app.isSystem) {
                            OutlinedButton(onClick = { ctx.requestUninstall(app.packageName) }) { Text("Uninstall…") }
                        }
                    }
                }
            }
        }

        item {
            TextButton(onClick = { vm.loadApps() }) { Text("Refresh list") }
        }
    }
}
