package com.safesweep.app.ui

import android.Manifest
import android.content.Intent
import android.os.Build
import android.os.storage.StorageManager
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ExpandLess
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TriStateCheckbox
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.state.ToggleableState
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.safesweep.app.core.Category
import com.safesweep.app.core.JunkItem
import com.safesweep.app.core.Trash
import com.safesweep.app.core.formatBytes

private const val MAX_ROWS_PER_CATEGORY = 300

@Composable
fun CleanScreen(vm: MainViewModel, modifier: Modifier) {
    val ctx = LocalContext.current
    val expanded = remember { mutableStateMapOf<Category, Boolean>() }
    var confirm by remember { mutableStateOf(false) }
    val legacyPermission = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) {
        vm.refreshPermissionsAndStats()
    }
    val systemCacheClear = rememberLauncherForActivityResult(ActivityResultContracts.StartActivityForResult()) {
        vm.refreshPermissionsAndStats()
    }
    val result = vm.result
    val grouped = result?.byCategory().orEmpty()
    val selectedItems = vm.selectedItems()
    val selectedBytes = selectedItems.sumOf { it.size }

    Column(modifier) {
        LazyColumn(
            modifier = Modifier.weight(1f),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            item { StorageCard(vm.storage) }

            if (!vm.storageAccess) item {
                InfoCard(
                    title = "Allow storage access to scan",
                    body = "SafeSweep needs \"All files access\" to look through your shared storage " +
                        "(Downloads, DCIM, etc). It still cannot touch Android system files or other " +
                        "apps' private data — Android blocks that for every non-root app.",
                    button = "Grant access",
                ) {
                    if (Build.VERSION.SDK_INT >= 30) ctx.openAllFilesAccess()
                    else legacyPermission.launch(Manifest.permission.WRITE_EXTERNAL_STORAGE)
                }
            } else item {
                ScanCard(vm)
            }

            vm.report?.let { rep ->
                item {
                    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)) {
                        Column(Modifier.padding(16.dp)) {
                            Text("Done", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                            Text("${rep.itemsDone} items cleaned.")
                            if (rep.freedNow > 0) Text("${formatBytes(rep.freedNow)} freed immediately.")
                            if (rep.movedToTrash > 0) Text(
                                "${formatBytes(rep.movedToTrash)} moved to the Recycle bin — restorable for " +
                                    "${Trash.RETENTION_DAYS} days, then freed automatically (or empty it now)."
                            )
                            if (rep.failures.isNotEmpty()) {
                                Text("${rep.failures.size} items were left untouched for safety:")
                                rep.failures.take(5).forEach { (item, why) ->
                                    Text("• ${item.file.name}: $why", style = MaterialTheme.typography.bodySmall)
                                }
                            }
                        }
                    }
                }
            }

            if (result != null && !vm.scanning) {
                item {
                    Text(
                        if (result.items.isEmpty()) "Nothing to clean — your storage is tidy."
                        else "Found ${formatBytes(result.items.sumOf { it.size })} in ${result.items.size} items " +
                            "(${result.filesScanned} files checked).",
                        style = MaterialTheme.typography.titleSmall,
                    )
                }
                grouped.forEach { (cat, list) ->
                    item(key = "cat_${cat.name}") {
                        CategoryHeader(
                            cat, list, vm,
                            expanded = expanded[cat] == true,
                            onToggleExpand = { expanded[cat] = expanded[cat] != true },
                        )
                    }
                    if (expanded[cat] == true) {
                        items(list.take(MAX_ROWS_PER_CATEGORY), key = { it.path }) { item ->
                            ItemRow(item, vm.selected[item.path] == true) { vm.selected[item.path] = it }
                        }
                        if (list.size > MAX_ROWS_PER_CATEGORY) item {
                            Text(
                                "…and ${list.size - MAX_ROWS_PER_CATEGORY} more (included in the category tick box)",
                                style = MaterialTheme.typography.bodySmall,
                                modifier = Modifier.padding(start = 16.dp),
                            )
                        }
                    }
                }
            }

            if (vm.storageAccess && Build.VERSION.SDK_INT >= 30) item {
                InfoCard(
                    title = "Clear all apps' caches",
                    body = "Uses Android's own built-in cache cleaner. Android asks you to confirm and " +
                        "only removes caches — never app data, logins or settings. Apps just rebuild " +
                        "what they need.",
                    button = "Open system cache cleaner",
                ) {
                    runCatching { systemCacheClear.launch(Intent(StorageManager.ACTION_CLEAR_APP_CACHE)) }
                        .onFailure { vm.message = "Your phone doesn't offer this — use the Apps tab instead." }
                }
            }

            item { SafetyCard() }
        }

        if (selectedItems.isNotEmpty() && !vm.scanning) {
            Surface(tonalElevation = 3.dp) {
                Button(
                    onClick = { confirm = true },
                    enabled = !vm.cleaning,
                    modifier = Modifier.fillMaxWidth().padding(16.dp),
                ) {
                    if (vm.cleaning) {
                        CircularProgressIndicator(Modifier.height(18.dp).width(18.dp), strokeWidth = 2.dp)
                        Spacer(Modifier.width(8.dp)); Text("Cleaning…")
                    } else Text("Clean ${selectedItems.size} items (${formatBytes(selectedBytes)})")
                }
            }
        }
    }

    if (confirm) {
        val toTrash = selectedItems.filter { it.category.useTrash }
        val direct = selectedItems.filter { !it.category.useTrash }
        AlertDialog(
            onDismissRequest = { confirm = false },
            title = { Text("Clean ${selectedItems.size} items?") },
            text = {
                Column {
                    if (toTrash.isNotEmpty()) Text(
                        "• ${toTrash.size} items (${formatBytes(toTrash.sumOf { it.size })}) go to the " +
                            "Recycle bin. You can restore them for ${Trash.RETENTION_DAYS} days."
                    )
                    if (direct.isNotEmpty()) Text(
                        "• ${direct.size} cache files / empty folders (${formatBytes(direct.sumOf { it.size })}) " +
                            "are removed. Android recreates thumbnails automatically."
                    )
                    Spacer(Modifier.height(8.dp))
                    Text("Anything that changed since the scan is skipped.", style = MaterialTheme.typography.bodySmall)
                }
            },
            confirmButton = { TextButton(onClick = { confirm = false; vm.clean() }) { Text("Clean") } },
            dismissButton = { TextButton(onClick = { confirm = false }) { Text("Cancel") } },
        )
    }
}

@Composable
private fun StorageCard(info: StorageInfo?) {
    Card {
        Column(Modifier.padding(16.dp).fillMaxWidth()) {
            Text("Phone storage", style = MaterialTheme.typography.titleMedium)
            if (info == null) return@Column
            val used = info.total - info.free
            Spacer(Modifier.height(8.dp))
            LinearProgressIndicator(
                progress = { if (info.total > 0) used.toFloat() / info.total else 0f },
                modifier = Modifier.fillMaxWidth().height(10.dp),
            )
            Spacer(Modifier.height(6.dp))
            Text("${formatBytes(used)} used of ${formatBytes(info.total)} — ${formatBytes(info.free)} free")
            val freePct = if (info.total > 0) info.free * 100 / info.total else 100
            if (freePct < 10) Text(
                "Under 10% free: this genuinely slows Android down. Cleaning will help.",
                color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall,
            )
            Text(
                "Memory: ${formatBytes(info.ramAvail)} available of ${formatBytes(info.ramTotal)} " +
                    "(Android manages this itself — \"RAM boosters\" make phones slower, so SafeSweep has none).",
                style = MaterialTheme.typography.bodySmall,
            )
        }
    }
}

@Composable
private fun ScanCard(vm: MainViewModel) {
    val progress by vm.scanProgress.collectAsState()
    Card {
        Column(Modifier.padding(16.dp).fillMaxWidth()) {
            if (vm.scanning) {
                Text("Scanning… ${progress.first} files checked", style = MaterialTheme.typography.titleMedium)
                Text(progress.second, maxLines = 1, overflow = TextOverflow.Ellipsis,
                    style = MaterialTheme.typography.bodySmall)
                Spacer(Modifier.height(8.dp))
                LinearProgressIndicator(Modifier.fillMaxWidth())
                Spacer(Modifier.height(8.dp))
                OutlinedButton(onClick = { vm.cancelScan() }) { Text("Cancel") }
            } else {
                Text("Scan for junk", style = MaterialTheme.typography.titleMedium)
                Text(
                    "Scanning only looks. Nothing is removed until you review the results and tap Clean.",
                    style = MaterialTheme.typography.bodySmall,
                )
                Spacer(Modifier.height(8.dp))
                Button(onClick = { vm.scan() }, modifier = Modifier.fillMaxWidth()) {
                    Text(if (vm.result == null) "Scan now" else "Scan again")
                }
            }
        }
    }
}

@Composable
private fun CategoryHeader(
    cat: Category, list: List<JunkItem>, vm: MainViewModel,
    expanded: Boolean, onToggleExpand: () -> Unit,
) {
    val sel = list.count { vm.selected[it.path] == true }
    val state = when (sel) {
        0 -> ToggleableState.Off
        list.size -> ToggleableState.On
        else -> ToggleableState.Indeterminate
    }
    Card(Modifier.fillMaxWidth()) {
        Column(Modifier.padding(vertical = 8.dp)) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.clickable(onClick = onToggleExpand).padding(end = 12.dp),
            ) {
                TriStateCheckbox(state = state, onClick = {
                    val newValue = state != ToggleableState.On
                    list.forEach { vm.selected[it.path] = newValue }
                })
                Column(Modifier.weight(1f)) {
                    Text(cat.title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                    Text("${list.size} items · ${formatBytes(list.sumOf { it.size })}",
                        style = MaterialTheme.typography.bodySmall)
                }
                Icon(if (expanded) Icons.Filled.ExpandLess else Icons.Filled.ExpandMore, contentDescription = "Show items")
            }
            Text(
                cat.description + if (cat.useTrash) " Goes to the Recycle bin." else "",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(horizontal = 16.dp),
            )
        }
    }
}

@Composable
private fun ItemRow(item: JunkItem, checked: Boolean, onChecked: (Boolean) -> Unit) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier.fillMaxWidth().clickable { onChecked(!checked) }.padding(start = 8.dp, end = 8.dp),
    ) {
        Checkbox(checked = checked, onCheckedChange = onChecked)
        Column(Modifier.weight(1f)) {
            Text(item.file.name + if (item.isDirectory) "/" else "", maxLines = 1, overflow = TextOverflow.Ellipsis)
            Text(
                item.file.parent.orEmpty().substringAfter("/emulated/0", item.file.parent.orEmpty()).ifEmpty { "/" },
                maxLines = 1, overflow = TextOverflow.Ellipsis,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            item.note?.let {
                Text(it, maxLines = 1, overflow = TextOverflow.Ellipsis, style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.primary)
            }
        }
        Text(formatBytes(item.size), style = MaterialTheme.typography.bodySmall)
    }
    HorizontalDivider()
}

@Composable
fun InfoCard(title: String, body: String, button: String, onClick: () -> Unit) {
    Card {
        Column(Modifier.padding(16.dp).fillMaxWidth()) {
            Text(title, style = MaterialTheme.typography.titleMedium)
            Spacer(Modifier.height(4.dp))
            Text(body, style = MaterialTheme.typography.bodySmall)
            Spacer(Modifier.height(8.dp))
            Button(onClick = onClick) { Text(button) }
        }
    }
}

@Composable
private fun SafetyCard() {
    var open by remember { mutableStateOf(false) }
    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)) {
        Column(Modifier.padding(16.dp).fillMaxWidth().clickable { open = !open }) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.Shield, contentDescription = null)
                Spacer(Modifier.width(8.dp))
                Text("Why this can't break your phone", style = MaterialTheme.typography.titleSmall,
                    modifier = Modifier.weight(1f))
                Icon(if (open) Icons.Filled.ExpandLess else Icons.Filled.ExpandMore, contentDescription = null)
            }
            if (open) {
                Spacer(Modifier.height(8.dp))
                listOf(
                    "No root. Android physically blocks normal apps from system files, so nothing that keeps your phone running can be touched.",
                    "Never touches the Android/ folder (app data, game files), with one exception you review yourself: folders left by apps you've uninstalled.",
                    "Skips hidden folders, never follows shortcuts (symlinks), never removes standard folders like DCIM or Download.",
                    "Your own files (large files, duplicates, old downloads, app leftovers) are never pre-ticked — you choose.",
                    "Everything except regenerable caches goes to a Recycle bin for ${Trash.RETENTION_DAYS} days first.",
                    "Each file is re-checked right before cleaning; if anything changed since the scan, it's skipped.",
                    "Apps are only ever uninstalled through Android's own confirmation dialog.",
                    "No internet permission: SafeSweep cannot send anything off your phone.",
                ).forEach { Text("• $it", style = MaterialTheme.typography.bodySmall) }
            }
        }
    }
}
