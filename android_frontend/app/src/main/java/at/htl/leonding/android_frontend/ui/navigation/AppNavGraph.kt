// FILE: src/main/java/at/htl/leonding/android_frontend/ui/navigation/AppNavGraph.kt
package at.htl.leonding.android_frontend.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import at.htl.leonding.android_frontend.ui.screens.cart.CartScreen
import at.htl.leonding.android_frontend.ui.screens.category.CategoryListScreen
import at.htl.leonding.android_frontend.ui.screens.cpu.CpuListRoute
import at.htl.leonding.android_frontend.ui.screens.profile.ProfileScreen
import at.htl.leonding.android_frontend.ui.screens.start.HomeScreen

@Composable
fun AppNavGraph(navController: NavHostController) {
    NavHost(
        navController = navController,
        startDestination = Route.Home.route
    ) {
        composable(Route.Home.route) {
            HomeScreen(
                onCategoryClick = { category ->
                    when (category) {
                        "cpu" -> navController.navigate(Route.CpuList.route)
                        else -> navController.navigate(Route.CategoryList.create(category))
                    }
                }
            )
        }

        composable(Route.Cart.route) { CartScreen() }
        composable(Route.Profile.route) { ProfileScreen() }

        // CPU list (your existing Retrofit-loaded screen via a route wrapper)
        composable(Route.CpuList.route) {
            CpuListRoute()
        }

        // Generic list for other categories
        composable(
            route = Route.CategoryList.route,
            arguments = listOf(navArgument("category") { type = NavType.StringType })
        ) { backStack ->
            val category = backStack.arguments?.getString("category") ?: return@composable
            CategoryListScreen(
                category = category,
                onBack = { navController.popBackStack() },
                onItemClick = { id ->
                    navController.navigate(Route.ComponentDetail.create(category, id))
                }
            )
        }
    }
}
