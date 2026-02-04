// FILE: ui/navigation/AppNavGraph.kt  (nur relevante Teile)
package at.htl.leonding.android_frontend.ui.navigation

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import at.htl.leonding.android_frontend.data.local.CartStore
import at.htl.leonding.android_frontend.di.ServiceLocator
import at.htl.leonding.android_frontend.ui.screens.components.ComponentsRoute
import at.htl.leonding.android_frontend.ui.screens.profile.ProfileScreen
import at.htl.leonding.android_frontend.ui.screens.start.HomeScreen
import at.htl.leonding.android_frontend.ui.screens.cart.CartScreen
import at.htl.leonding.android_frontend.ui.screens.cart.CartViewModel

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
                onCategoryClick = { type ->
                    navController.navigate(Route.components(type))
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
                onNavigateToCart = { navController.navigate(Route.CART) }
            )
        }

        composable(Route.CART) {
            val context = LocalContext.current
            val cartVm: CartViewModel = viewModel(
                factory = CartViewModelFactory(
                    ServiceLocator.repository,
                    CartStore(context)
                )
            )
            CartScreen(vm = cartVm)
        }

        composable(Route.PROFILE) { ProfileScreen() }
    }
}
