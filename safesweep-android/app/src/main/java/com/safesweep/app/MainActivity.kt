package com.safesweep.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import com.safesweep.app.ui.MainViewModel
import com.safesweep.app.ui.SafeSweepApp

class MainActivity : ComponentActivity() {
    private val vm: MainViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent { SafeSweepApp(vm) }
    }

    override fun onResume() {
        super.onResume()
        // Permissions are granted in system Settings, so re-check every time we come back.
        vm.refreshPermissionsAndStats()
    }
}
