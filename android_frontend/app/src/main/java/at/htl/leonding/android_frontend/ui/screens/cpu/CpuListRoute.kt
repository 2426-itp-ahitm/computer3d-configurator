// FILE: src/main/java/at/htl/leonding/android_frontend/ui/screens/cpu/CpuListRoute.kt
package at.htl.leonding.android_frontend.ui.screens.cpu

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.compose.viewModel
import at.htl.leonding.android_frontend.di.ServiceLocator

@Composable
fun CpuListRoute(
    vm: CpuViewModel = viewModel(
        factory = object : ViewModelProvider.Factory {
            override fun <T : ViewModel> create(modelClass: Class<T>): T {
                @Suppress("UNCHECKED_CAST")
                return CpuViewModel(ServiceLocator.repository) as T
            }
        }
    )
) {
    val state by vm.state.collectAsState()

    CpuListScreen(
        state = state,
        onReload = { vm.reload() },
        onSelectCpu = {vm.selectCpu(it)},
        onAddToCart = { vm.addSelectedCpuToCart(shoppingCartId = 1) }
    )
}