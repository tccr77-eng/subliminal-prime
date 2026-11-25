package com.safesweep.app.ui

import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Apps
import androidx.compose.material.icons.filled.CleaningServices
import androidx.compose.material.icons.filled.RestoreFromTrash
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext

@Composable
fun SafeSweepTheme(content: @Composable () -> Unit) {
    val dark = isSystemInDarkTheme()
    val ctx = LocalContext.current
    val scheme = when {
        Build.VERSION.SDK_INT >= 31 -> if (dark) dynamicDarkColorScheme(ctx) else dynamicLightColorScheme(ctx)
        dark -> darkColorScheme(primary = Color(0xFF5DD4B5), secondary = Color(0xFF8ACFC0))
        else -> lightColorScheme(primary = Color(0xFF0E7C66), secondary = Color(0xFF3F6A60))
    }
    MaterialTheme(colorScheme = scheme, content = content)
}

private data class Tab(val label: String, val icon: ImageVector)

private val TABS = listOf(
    Tab("Clean", Icons.Filled.CleaningServices),
    Tab("Apps", Icons.Filled.Apps),
    Tab("Recycle bin", Icons.Filled.RestoreFromTrash),
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SafeSweepApp(vm: MainViewModel) {
    SafeSweepTheme {
        var tab by rememberSaveable { mutableIntStateOf(0) }
        val snackbar = remember { SnackbarHostState() }
        LaunchedEffect(vm.message) {
            vm.message?.let { snackbar.showSnackbar(it); vm.message = null }
        }
        Scaffold(
            topBar = { TopAppBar(title = { Text("SafeSweep") }) },
            snackbarHost = { SnackbarHost(snackbar) },
            bottomBar = {
                NavigationBar {
                    TABS.forEachIndexed { i, t ->
                        NavigationBarItem(
                            selected = tab == i,
                            onClick = { tab = i },
                            icon = { Icon(t.icon, contentDescription = null) },
                            label = { Text(t.label) },
                        )
                    }
                }
            },
        ) { padding ->
            val mod = Modifier.padding(padding)
            when (tab) {
                0 -> CleanScreen(vm, mod)
                1 -> AppsScreen(vm, mod)
                else -> TrashScreen(vm, mod)
            }
        }
    }
}

// ---- Intents into Android's own settings screens -------------------------------------------

fun Context.safeStart(intent: Intent, fallback: Intent? = null) {
    try {
        startActivity(intent)
    } catch (e: ActivityNotFoundException) {
        fallback?.let { runCatching { startActivity(it) } }
    } catch (e: SecurityException) {
        fallback?.let { runCatching { startActivity(it) } }
    }
}

fun Context.openAllFilesAccess() {
    if (Build.VERSION.SDK_INT >= 30) safeStart(
        Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION, Uri.parse("package:$packageName")),
        Intent(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION),
    )
}

fun Context.openUsageAccess() = safeStart(
    Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS, Uri.parse("package:$packageName")),
    Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS),
)

fun Context.openAppInfo(pkg: String) =
    safeStart(Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:$pkg")))

/** Android shows its own "Uninstall this app?" confirmation. Nothing happens without your OK. */
fun Context.requestUninstall(pkg: String) =
    safeStart(Intent(Intent.ACTION_DELETE, Uri.parse("package:$pkg")))

fun Context.openStorageSettings() = safeStart(Intent(Settings.ACTION_INTERNAL_STORAGE_SETTINGS))
