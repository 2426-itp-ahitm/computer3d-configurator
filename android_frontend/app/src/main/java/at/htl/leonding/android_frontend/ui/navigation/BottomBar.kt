package at.htl.leonding.android_frontend.ui.navigation

import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.currentBackStackEntryAsState

@Composable
fun BottomBar(navController: NavHostController) {
    val items = listOf(Route.Home, Route.Cart, Route.Profile)

    val entry = navController.currentBackStackEntryAsState().value
    val current = entry?.destination?.route

    // Damit Home auch als selected gilt, wenn man in category/... oder detail/... ist:
    val selectedBottom = when {
        current == Route.Cart.route -> Route.Cart.route
        current == Route.Profile.route -> Route.Profile.route
        else -> Route.Home.route
    }

    NavigationBar {
        items.forEach { item ->
            NavigationBarItem(
                selected = selectedBottom == item.route,
                onClick = {
                    navController.navigate(item.route) {
                        popUpTo(navController.graph.startDestinationId) { saveState = true }
                        launchSingleTop = true
                        restoreState = true
                    }
                },
                label = { Text(item.label) },
                icon = {}
            )
        }
    }
}
