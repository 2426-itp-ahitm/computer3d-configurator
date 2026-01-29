package at.htl.leonding.android_frontend.ui.navigation

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import at.htl.leonding.android_frontend.data.local.CartStore
import at.htl.leonding.android_frontend.di.ServiceLocator
import at.htl.leonding.android_frontend.ui.screens.cart.CartScreen
import at.htl.leonding.android_frontend.ui.screens.cart.CartViewModel
import at.htl.leonding.android_frontend.ui.screens.cpu.CpuListRoute
import at.htl.leonding.android_frontend.ui.screens.profile.ProfileScreen
import at.htl.leonding.android_frontend.ui.screens.start.HomeScreen

@Composable
fun AppNavGraph(
    navController: NavHostController,
    modifier: Modifier = Modifier
) {
    NavHost(
        navController = navController,
        startDestination = Route.HOME,
        modifier = modifier
    ) {
        composable(Route.HOME) {
            HomeScreen(
                onCategoryClick = { category ->
                    navController.navigate(category)
                }
            )
        }

        composable(Route.CPU) {
            CpuListRoute()
        }

        // Platzhalter für jetzt
        composable(Route.GPU) { Text("GPU – coming soon") }
        composable(Route.RAM) { Text("RAM – coming soon") }
        composable(Route.MOTHERBOARD) { Text("Motherboard – coming soon") }
        composable(Route.PSU) { Text("PSU – coming soon") }
        composable(Route.STORAGE) { Text("Storage – coming soon") }
        composable(Route.CASE) { Text("Case – coming soon") }
        composable(Route.COOLER) { Text("Cooler – coming soon") }

        composable(Route.CART) {
            val context = LocalContext.current

            val cartVm: CartViewModel = viewModel(
                factory = CartViewModelFactory(
                    repo = ServiceLocator.repository,
                    cartStore = CartStore(context)
                )
            )

            CartScreen(vm = cartVm)
        }

        composable(Route.PROFILE) {
            ProfileScreen()
        }
    }
}

private class CartViewModelFactory(
    private val repo: at.htl.leonding.android_frontend.data.repo.PcRepository,
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