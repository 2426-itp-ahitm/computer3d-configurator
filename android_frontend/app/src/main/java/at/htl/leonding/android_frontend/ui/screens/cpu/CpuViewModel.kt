// FILE: ui/screens/cpu/CpuViewModel.kt
package at.htl.leonding.android_frontend.ui.screens.cpu

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import at.htl.leonding.android_frontend.data.model.CpuDto
import at.htl.leonding.android_frontend.data.repo.PcRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

data class CpuListState(
    val loading: Boolean = false,
    val items: List<CpuDto> = emptyList(),
    val error: String? = null,
    val selectedCpuId: Long? = null
)

class CpuViewModel(private val repo: PcRepository) : ViewModel() {

    private val _state = MutableStateFlow(CpuListState(loading = true))
    val state: StateFlow<CpuListState> = _state

    init { load() }

    fun load() {
        viewModelScope.launch {
            try {
                _state.value = _state.value.copy(loading = true, error = null)
                val cpus = repo.getCpus()
                _state.value = _state.value.copy(loading = false, items = cpus)
            } catch (t: Throwable) {
                _state.value = _state.value.copy(loading = false, error = t.message ?: "Error")
            }
        }
    }

    fun reload() = load()

    fun selectCpu(id: Long) {
        _state.value = _state.value.copy(selectedCpuId = id)
    }

    fun addSelectedCpuToCart() {
        val cpuId = _state.value.selectedCpuId ?: return
        viewModelScope.launch {
            runCatching {
                repo.updateCart(1L, "cpu", cpuId)
            }.onFailure { e ->
                _state.value = _state.value.copy(error = e.message ?: "Error")
            }
        }
    }
}