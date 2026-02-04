package at.htl.leonding.android_frontend.ui.screens.components

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class ComponentListViewModel(
    private val loadItems: suspend () -> List<ComponentListItem>,
    private val updateSelection: suspend (cartId: Long, selectedId: Long) -> Unit
) : ViewModel() {

    private val _state = MutableStateFlow(ComponentListState(loading = true))
    val state: StateFlow<ComponentListState> = _state

    init { load() }

    fun load() {
        viewModelScope.launch {
            try {
                _state.value = _state.value.copy(loading = true, error = null)
                val items = loadItems()
                _state.value = _state.value.copy(loading = false, items = items)
            } catch (t: Throwable) {
                _state.value = _state.value.copy(loading = false, error = t.message ?: "Error")
            }
        }
    }

    fun reload() = load()

    fun select(id: Long) {
        _state.value = _state.value.copy(selectedId = id)
    }

    fun addToCart(cartId: Long) {
        val selected = _state.value.selectedId ?: return
        viewModelScope.launch {
            runCatching { updateSelection(cartId, selected) }
                .onFailure { e -> _state.value = _state.value.copy(error = e.message ?: "Error") }
        }
    }
}
