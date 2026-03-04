package at.htl.leonding.android_frontend

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import at.htl.leonding.android_frontend.data.local.CartStore
import at.htl.leonding.android_frontend.di.ServiceLocator
import at.htl.leonding.android_frontend.ui.navigation.AppNavGraph
import at.htl.leonding.android_frontend.ui.navigation.AppScaffold
import at.htl.leonding.android_frontend.ui.navigation.CartViewModelFactory
import at.htl.leonding.android_frontend.ui.screens.cart.CartViewModel

@Composable
fun App() {
    val navController = rememberNavController()
    val context = LocalContext.current

    val cartVm: CartViewModel = viewModel(
        factory = CartViewModelFactory(
            ServiceLocator.repository,
            CartStore(context)
        )
    )

    // Den Zustand des Warenkorbs beobachten
    val cartState by cartVm.state.collectAsState()
    val count = cartState.cart?.getItemCount() ?: 0

    Surface(color = MaterialTheme.colorScheme.background) {
        AppScaffold(
            navController = navController,
            // Hier nutzen wir jetzt den echten Count!
            cartBadgeCount = if (count > 0) count else null
        ) { modifier ->
            AppNavGraph(
                navController = navController,
                modifier = modifier,
                cartVm = cartVm // Wir geben das VM an den Graph weiter
            )
        }
    }
}