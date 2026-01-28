package at.htl.leonding.android_frontend

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.navigation.compose.rememberNavController
import at.htl.leonding.android_frontend.ui.navigation.AppNavGraph
import at.htl.leonding.android_frontend.ui.navigation.AppScaffold

@Composable
fun App() {
    val navController = rememberNavController()

    Surface(color = MaterialTheme.colorScheme.background) {
        AppScaffold(
            navController = navController,
            cartBadgeCount = 1
        ) { modifier ->
            AppNavGraph(
                navController = navController,
                modifier = modifier
            )
        }
    }
}