// FILE: ui/navigation/AppNavGraph.kt
package at.htl.leonding.android_frontend.ui.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import at.htl.leonding.android_frontend.di.ServiceLocator
import at.htl.leonding.android_frontend.ui.screens.components.ComponentsRoute
import at.htl.leonding.android_frontend.ui.screens.profile.ProfileScreen
import at.htl.leonding.android_frontend.ui.screens.start.HomeScreen
import at.htl.leonding.android_frontend.ui.screens.cart.CartScreen
import at.htl.leonding.android_frontend.ui.screens.cart.CartViewModel
import at.htl.leonding.android_frontend.ui.screens.start.HomeViewModel

@Composable
fun AppNavGraph(
    navController: NavHostController,
    modifier: Modifier = Modifier,
    cartVm: CartViewModel // Dieses VM wird nun überall geteilt
) {
    NavHost(
        navController = navController,
        startDestination = Route.HOME,
        modifier = modifier
    ) {
        composable(Route.HOME) {
            val homeVm: HomeViewModel = viewModel(factory = HomeViewModelFactory(ServiceLocator.repository))
            val allComp by homeVm.allComponents.collectAsState()
            val cartState by cartVm.state.collectAsState()

            HomeScreen(
                allComponents = allComp,
                // Wir vergleichen die ID mit allen möglichen Komponenten im aktuellen Warenkorb
                selectedId = cartState.cart?.let { cart ->
                    listOfNotNull(cart.cpu?.cpuId, cart.gpu?.id, cart.ram?.id,
                        cart.motherboard?.id, cart.psu?.id, cart.storage?.id).firstOrNull()
                    // Hinweis: Das ist eine Vereinfachung. In der Suche könnten mehrere IDs matchen.
                },
                onCategoryClick = { type ->
                    navController.navigate(Route.components(type))
                },
                onComponentSelect = { id ->
                    // Hier finden wir das Item in der Liste, um den Typ zu bekommen
                    val item = allComp.find { it.id == id }
                    item?.let {
                        // Wir nutzen das Repository (oder ein VM), um den Cart zu updaten
                        // Da wir uns im NavGraph befinden, ist es am saubersten,
                        // eine Funktion im HomeViewModel oder CartViewModel dafür zu haben.
                        homeVm.selectAndSave(id, it.type) {
                            cartVm.loadCart() // Badge updaten
                        }
                    }
                }
            )
        }
        composable(
            route = Route.COMPONENTS_TYPE,
            arguments = listOf(navArgument("type") { type = NavType.StringType })
        ) { backStackEntry ->
            val type = backStackEntry.arguments?.getString("type") ?: "cpu"

            ComponentsRoute(
                type = type,
                repo = ServiceLocator.repository,
                cartId = 1L,
                onNavigateToCart = { navController.navigate(Route.CART) },
                onProductSelected = {
                    cartVm.loadCart()
                }
            )
        }

        composable(Route.CART) {
            CartScreen(vm = cartVm)
        }

        composable(Route.PROFILE) { ProfileScreen() }
    }
}