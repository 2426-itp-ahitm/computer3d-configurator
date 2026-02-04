// FILE: ui/navigation/ViewModelFactories.kt
package at.htl.leonding.android_frontend.ui.navigation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import at.htl.leonding.android_frontend.data.local.CartStore
import at.htl.leonding.android_frontend.data.repo.PcRepository
import at.htl.leonding.android_frontend.ui.screens.cart.CartViewModel
import at.htl.leonding.android_frontend.ui.screens.components.cpu.CpuViewModel

class CpuViewModelFactory(
    private val repo: PcRepository
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(CpuViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return CpuViewModel(repo) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class: ${modelClass.name}")
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