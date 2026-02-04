package at.htl.leonding.android_frontend.ui.screens.components
// FILE: ui/screens/components/RememberVm.kt

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.compose.viewModel

@Composable
fun rememberComponentVm(
    loadItems: suspend () -> List<ComponentListItem>,
    updateSelection: suspend (cartId: Long, selectedId: Long) -> Unit
): ComponentListViewModel {
    val factory = remember(loadItems, updateSelection) {
        object : ViewModelProvider.Factory {
            override fun <T : ViewModel> create(modelClass: Class<T>): T {
                @Suppress("UNCHECKED_CAST")
                return ComponentListViewModel(loadItems, updateSelection) as T
            }
        }
    }
    return viewModel(factory = factory)
}
