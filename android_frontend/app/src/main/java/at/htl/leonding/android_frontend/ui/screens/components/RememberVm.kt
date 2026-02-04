package at.htl.leonding.android_frontend.ui.screens.components

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.compose.viewModel
import at.htl.leonding.android_frontend.data.repo.PcRepository

@Composable
fun rememberComponentVm(
    repo: PcRepository,
    type: String,
    cartId: Long // Hier neu hinzufügen
): ComponentListViewModel {
    // cartId muss auch in den 'remember' Key, damit bei einer
    // anderen CartId (falls möglich) das VM neu erstellt wird.
    val factory = remember(repo, type, cartId) {
        object : ViewModelProvider.Factory {
            override fun <T : ViewModel> create(modelClass: Class<T>): T {
                @Suppress("UNCHECKED_CAST")
                return ComponentListViewModel(repo, type, cartId) as T
            }
        }
    }
    return viewModel(factory = factory)
}