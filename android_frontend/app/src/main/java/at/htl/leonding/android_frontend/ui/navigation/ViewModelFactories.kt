// FILE: ui/navigation/ViewModelFactories.kt
package at.htl.leonding.android_frontend.ui.navigation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import at.htl.leonding.android_frontend.data.local.CartStore
import at.htl.leonding.android_frontend.data.repo.PcRepository
import at.htl.leonding.android_frontend.ui.screens.cart.CartViewModel
import at.htl.leonding.android_frontend.ui.screens.components.ComponentListViewModel
import at.htl.leonding.android_frontend.ui.screens.start.HomeViewModel


// FILE: ui/navigation/ViewModelFactories.kt (Ergänzung)

class ComponentListViewModelFactory(
    private val repo: PcRepository,
    private val componentType: String,
    private val cartId: Long // NEU
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(ComponentListViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            // Hier wird die cartId ans ViewModel übergeben
            return ComponentListViewModel(repo, componentType, cartId) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}

class CartViewModelFactory(
    private val repo: PcRepository,
    private val cartStore: CartStore
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(CartViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return CartViewModel(repo, cartStore) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class: ${modelClass.name}")
    }
}

class HomeViewModelFactory(
    private val repo: PcRepository
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(HomeViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return HomeViewModel(repo) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}