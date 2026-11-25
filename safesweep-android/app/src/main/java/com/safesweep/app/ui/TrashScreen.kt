package com.safesweep.app.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.safesweep.app.core.Trash
import com.safesweep.app.core.formatBytes

@Composable
fun TrashScreen(vm: MainViewModel, modifier: Modifier) {
    LaunchedEffect(Unit) { vm.loadTrash() }
    var confirmEmpty by remember { mutableStateOf(false) }
    val entries = vm.trashEntries
    val now = System.currentTimeMillis()

    LazyColumn(
        modifier = modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        item {
            Card(Modifier.fillMaxWidth()) {
                Column(Modifier.padding(16.dp)) {
                    Text("Recycle bin", style = MaterialTheme.typography.titleMedium)
                    Text(
                        "${entries.size} items · ${formatBytes(entries.sumOf { it.size })}. Items are kept for " +
                            "${Trash.RETENTION_DAYS} days so you can put them back, then removed for good automatically.",
                        style = MaterialTheme.typography.bodySmall,
                    )
                    if (entries.isNotEmpty()) Button(onClick = { confirmEmpty = true }) { Text("Empty now to free space") }
                }
            }
        }
        if (!vm.storageAccess) item { Text("Grant storage access on the Clean tab first.") }
        else if (entries.isEmpty()) item { Text("The recycle bin is empty.") }

        items(entries, key = { it.entryDir.path }) { e ->
            val daysLeft = Trash.RETENTION_DAYS - ((now - e.trashedAt) / (24L * 3600 * 1000))
            Card(Modifier.fillMaxWidth()) {
                Column(Modifier.padding(12.dp)) {
                    Text(e.payload.name + if (e.isDirectory) "/" else "", fontWeight = FontWeight.SemiBold,
                        maxLines = 1, overflow = TextOverflow.Ellipsis)
                    Text("From ${e.originalPath.substringAfter("/emulated/0", e.originalPath)}",
                        style = MaterialTheme.typography.bodySmall, maxLines = 2, overflow = TextOverflow.Ellipsis)
                    Text("${formatBytes(e.size)} · deleted for good in ${daysLeft.coerceAtLeast(0)} days",
                        style = MaterialTheme.typography.bodySmall)
                    Row {
                        TextButton(onClick = { vm.restore(e) }) { Text("Restore") }
                        TextButton(onClick = { vm.deleteForever(e) }) { Text("Delete now") }
                    }
                }
            }
        }
    }

    if (confirmEmpty) AlertDialog(
        onDismissRequest = { confirmEmpty = false },
        title = { Text("Empty the recycle bin?") },
        text = { Text("${entries.size} items (${formatBytes(entries.sumOf { it.size })}) will be permanently deleted. This can't be undone.") },
        confirmButton = { TextButton(onClick = { confirmEmpty = false; vm.emptyTrash() }) { Text("Empty") } },
        dismissButton = { TextButton(onClick = { confirmEmpty = false }) { Text("Cancel") } },
    )
}
