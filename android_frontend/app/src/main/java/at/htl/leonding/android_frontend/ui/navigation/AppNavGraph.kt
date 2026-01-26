package at.htl.leonding.android_frontend.ui.navigation

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import androidx.navigation.NavType
import at.htl.leonding.android_frontend.ui.screens.cart.CartScreen
import at.htl.leonding.android_frontend.ui.screens.profile.ProfileScreen
import at.htl.leonding.android_frontend.ui.screens.start.HomeScreen
import at.htl.leonding.android_frontend.ui.screens.cpu.CpuListRoute

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

        composable(Route.CART) { CartScreen() }
        composable(Route.PROFILE) { ProfileScreen() }
    }
}