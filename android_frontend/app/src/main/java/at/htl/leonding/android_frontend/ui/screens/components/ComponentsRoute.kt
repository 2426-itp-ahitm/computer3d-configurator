package at.htl.leonding.android_frontend.ui.screens.components
// FILE: ui/screens/components/ComponentsRoute.kt

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import at.htl.leonding.android_frontend.data.repo.PcRepository
import at.htl.leonding.android_frontend.ui.screens.components.cpu.toListItem

@Composable
fun ComponentsRoute(
    type: String,
    repo: PcRepository,
    cartId: Long = 1L,                 // aktuell: immer auf cart 1 speichern
    onNavigateToCart: () -> Unit
) {
    val (title, loadItems, updateSelection) = when (type) {
        "cpu" -> Triple(
            "CPUs",
            suspend { repo.getCpus().map { it.toListItem() } },
            suspend { cId: Long, selectedId: Long -> repo.updateCart(cId, "cpu", selectedId) }
        )

        else -> Triple(
            type.uppercase(),
            suspend { emptyList<ComponentListItem>() },
            suspend { _: Long, _: Long -> }
        )
    }

    val vm = rememberComponentVm(loadItems, updateSelection)
    val state by vm.state.collectAsState()

    ComponentListScreen(
        title = title,
        state = state,
        onReload = { vm.reload() },
        onSelect = { vm.select(it) },
        onAddToCart = {
            vm.addToCart(cartId)
            onNavigateToCart()
        }
    )
}
