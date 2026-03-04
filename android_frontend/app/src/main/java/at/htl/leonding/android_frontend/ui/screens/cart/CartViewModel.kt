// FILE: ui/screens/cart/CartViewModel.kt
package at.htl.leonding.android_frontend.ui.screens.cart

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import at.htl.leonding.android_frontend.data.local.CartStore
import at.htl.leonding.android_frontend.data.model.ShoppingCartDto
import at.htl.leonding.android_frontend.data.repo.PcRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

data class CartState(
    val loading: Boolean = false,
    val cart: ShoppingCartDto? = null,
    val error: String? = null
)

class CartViewModel(
    private val repo: PcRepository,
    private val cartStore: CartStore
) : ViewModel() {

    private val _state = MutableStateFlow(CartState(loading = true))
    val state: StateFlow<CartState> = _state

    init {
        loadCart()
    }

    fun loadCart() {
        viewModelScope.launch {
            _state.value = CartState(loading = true)

            runCatching {
                repo.getCart(1L)
            }.onSuccess {
                _state.value = CartState(loading = false, cart = it)
            }.onFailure {
                _state.value = CartState(loading = false, error = it.message)
            }
        }
    }
}