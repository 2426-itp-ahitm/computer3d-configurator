// FILE: ui/screens/components/ComponentListViewModel.kt
package at.htl.leonding.android_frontend.ui.screens.components

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import at.htl.leonding.android_frontend.data.repo.PcRepository
import at.htl.leonding.android_frontend.ui.screens.components.mapper.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class ComponentListViewModel(
    private val repo: PcRepository,
    private val componentType: String,
    private val cartId: Long
) : ViewModel() {

    private val _state = MutableStateFlow(ComponentListState(loading = true))
    val state: StateFlow<ComponentListState> = _state

    val title: String = when (componentType.lowercase()) {
        "cpu" -> "Prozessoren"
        "gpu" -> "Grafikkarten"
        "ram" -> "Arbeitsspeicher"
        "motherboard" -> "Mainboards"
        "storage" -> "Festplatten"
        "psu" -> "Netzteile"
        "cooler" -> "CPU-Kühler"
        else -> componentType.uppercase()
    }

    init { load() }

    fun load() {
        viewModelScope.launch {
            try {
                _state.value = _state.value.copy(loading = true, error = null)

                val items = when (componentType.lowercase()) {
                    "cpu" -> repo.getCpus().map { it.toListItem() }
                    "gpu" -> repo.getGpus().map { it.toListItem() }
                    "ram" -> repo.getRams().map { it.toListItem() }
                    "motherboard" -> repo.getMotherboards().map { it.toListItem() }
                    "storage" -> repo.getHarddrives().map { it.toListItem() }
                    "psu" -> repo.getPowerSupplies().map { it.toListItem() }
                    "cooler" -> repo.getCpuCoolers().map { it.toListItem() }
                    else -> emptyList()
                }

                val currentCart = repo.getCart(cartId)
                val preSelectedId = when (componentType.lowercase()) {
                    "cpu" -> currentCart.cpu?.cpuId
                    "gpu" -> currentCart.gpu?.id
                    "ram" -> currentCart.ram?.id
                    "motherboard" -> currentCart.motherboard?.id
                    "storage" -> currentCart.storage?.id
                    "psu" -> currentCart.psu?.id
                    "cooler" -> currentCart.cooler?.id
                    else -> null
                }

                _state.value = _state.value.copy(
                    loading = false,
                    items = items,
                    selectedId = preSelectedId
                )
            } catch (t: Throwable) {
                _state.value = _state.value.copy(loading = false, error = t.message)
            }
        }
    }

    fun reload() = load()

    fun selectAndSave(id: Long, onSaved: () -> Unit) {
        _state.value = _state.value.copy(selectedId = id)

        viewModelScope.launch {
            try {
                repo.updateCart(cartId, componentType, id)
                onSaved()
            } catch (t: Throwable) {
                _state.value = _state.value.copy(error = "Speichern fehlgeschlagen")
            }
        }
    }
}
