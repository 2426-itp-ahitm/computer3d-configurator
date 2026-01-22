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
    val error: String? = null
)

class CpuViewModel(
    private val repo: PcRepository
) : ViewModel() {

    private val _state = MutableStateFlow(CpuListState(loading = true))
    val state: StateFlow<CpuListState> = _state

    init {
        load() // ✅ WICHTIG
    }

    fun load() {
        viewModelScope.launch {
            try {
                _state.value = CpuListState(loading = true)
                val cpus = repo.getCpus()
                _state.value = CpuListState(
                    loading = false,
                    items = cpus
                )
            } catch (t: Throwable) {
                _state.value = CpuListState(
                    loading = false,
                    error = t.message ?: "Error"
                )
            }
        }
    }

    fun reload() {
        viewModelScope.launch {
            _state.value = _state.value.copy(loading = true, error = null)

            runCatching { repo.getCpus() }
                .onSuccess { items ->
                    _state.value = _state.value.copy(
                        loading = false,
                        items = items
                    )
                }
                .onFailure { e ->
                    _state.value = _state.value.copy(
                        loading = false,
                        error = e.message ?: "Error"
                    )
                }
        }
    }
}
