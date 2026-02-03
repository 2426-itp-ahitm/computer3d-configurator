// FILE: ui/navigation/AppNavGraph.kt
package at.htl.leonding.android_frontend.ui.navigation

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import at.htl.leonding.android_frontend.data.local.CartStore
import at.htl.leonding.android_frontend.di.ServiceLocator
import at.htl.leonding.android_frontend.ui.screens.cart.CartScreen
import at.htl.leonding.android_frontend.ui.screens.cart.CartViewModel
import at.htl.leonding.android_frontend.ui.screens.cpu.CpuScreen
import at.htl.leonding.android_frontend.ui.screens.cpu.CpuViewModel
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
            HomeScreen(onCategoryClick = { category -> navController.navigate(category) })
        }

        composable(Route.CPU) {
            val context = LocalContext.current

            val cpuVm: CpuViewModel = viewModel(factory = CpuViewModelFactory(ServiceLocator.repository))
            val cartVm: CartViewModel = viewModel(factory = CartViewModelFactory(ServiceLocator.repository, CartStore(context)))

            CpuScreen(
                cpuVm = cpuVm,
                cartVm = cartVm,
                onNavigateToCart = { navController.navigate(Route.CART) } // uses your edited navigate call idea
            )
        }

        composable(Route.GPU) { Text("GPU – coming soon") }
        composable(Route.RAM) { Text("RAM – coming soon") }
        composable(Route.MOTHERBOARD) { Text("Motherboard – coming soon") }
        composable(Route.PSU) { Text("PSU – coming soon") }
        composable(Route.STORAGE) { Text("Storage – coming soon") }
        composable(Route.CASE) { Text("Case – coming soon") }
        composable(Route.COOLER) { Text("Cooler – coming soon") }

        composable(Route.CART) {
            val context = LocalContext.current
            val cartVm: CartViewModel = viewModel(factory = CartViewModelFactory(ServiceLocator.repository, CartStore(context)))
            CartScreen(vm = cartVm)
        }

        composable(Route.PROFILE) { ProfileScreen() }
    }
}