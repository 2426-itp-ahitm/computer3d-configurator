package at.htl.leonding.android_frontend.ui.screens.start

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import at.htl.leonding.android_frontend.data.repo.PcRepository
import at.htl.leonding.android_frontend.ui.screens.components.ComponentListItem
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class HomeViewModel(private val repo: PcRepository) : ViewModel() {
    private val _allComponents = MutableStateFlow<List<ComponentListItem>>(emptyList())
    val allComponents: StateFlow<List<ComponentListItem>> = _allComponents

    init {
        viewModelScope.launch {
            try {
                _allComponents.value = repo.getAllComponents()
            } catch (e: Exception) {
                // Fehlerbehandlung
            }
        }
    }

    fun selectAndSave(id: Long, type: String, onSaved: () -> Unit) {
        viewModelScope.launch {
            try {
                // Hardcoded cartId 1L wie in deiner ComponentsRoute
                repo.updateCart(1L, type, id)
                onSaved()
            } catch (e: Exception) {
                // Fehlerbehandlung
            }
        }
    }
}