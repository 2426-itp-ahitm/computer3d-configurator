package at.htl.leonding.android_frontend.ui.screens.components

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.lifecycle.viewmodel.compose.viewModel
import at.htl.leonding.android_frontend.data.repo.PcRepository
import at.htl.leonding.android_frontend.ui.navigation.ComponentListViewModelFactory


// FILE: ui/screens/components/ComponentsRoute.kt
@Composable
fun ComponentsRoute(
    type: String,
    repo: PcRepository,
    cartId: Long = 1L,
    onNavigateToCart: () -> Unit
) {
    val factory = remember(type, repo, cartId) {
        ComponentListViewModelFactory(repo, type, cartId)
    }

    // Explizite Typangabe hilft der IDE:
    val vm: ComponentListViewModel = viewModel(factory = factory)
    val state by vm.state.collectAsState()

    ComponentListScreen(
        title = vm.title,
        state = state,
        onReload = { vm.reload() },
        onSelect = { vm.selectAndSave(it) }
    )
}