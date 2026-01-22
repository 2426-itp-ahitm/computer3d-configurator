// FILE: src/main/java/at/htl/leonding/android_frontend/ui/screens/cpu/CpuListRoute.kt
package at.htl.leonding.android_frontend.ui.screens.cpu

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.compose.runtime.collectAsState

@Composable
fun CpuListRoute(
    vm: CpuViewModel = viewModel()
) {
    val state by vm.state.collectAsState() // vm.state is StateFlow<CpuListState>

    CpuListScreen(
        state = state,
        onReload = { vm.reload() }
    )
}
