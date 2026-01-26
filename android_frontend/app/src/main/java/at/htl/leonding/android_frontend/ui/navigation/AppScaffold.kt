package at.htl.leonding.android_frontend.ui.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController

@Composable
fun AppScaffold(
    navController: NavHostController,
    cartBadgeCount: Int? = null,
    content: @Composable (Modifier) -> Unit
) {
    Scaffold(
        bottomBar = { BottomBar(navController = navController, cartBadgeCount = cartBadgeCount) }
    ) { innerPadding ->
        content(Modifier.padding(innerPadding))
    }
}