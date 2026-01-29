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

    init { loadOrCreateCart() }

    fun loadOrCreateCart() {
        viewModelScope.launch {
            _state.value = CartState(loading = true)

            runCatching {
                val existingId = cartStore.getCartId()
                if (existingId != null) {
                    repo.getCart(existingId)
                } else {
                    val newCart = repo.createCart()
                    cartStore.setCartId(newCart.id)
                    newCart
                }
            }.onSuccess { cart ->
                _state.value = CartState(loading = false, cart = cart)
            }.onFailure { e ->
                _state.value = CartState(loading = false, error = e.message ?: "Error")
            }
        }
    }

    fun getCurrentCartIdOrNull(): Long? = _state.value.cart?.id
}