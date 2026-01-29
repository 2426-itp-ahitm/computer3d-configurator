package at.htl.leonding.android_frontend.ui.screens.cart

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CartScreen(
    vm: CartViewModel
) {/*
    val state by vm.state.collectAsState()

    Scaffold(
        topBar = { TopAppBar(title = { Text("Warenkorb") }) }
    ) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            when {
                state.loading -> {
                    CircularProgressIndicator(modifier = Modifier.padding(16.dp))
                }

                state.error != null -> {
                    Text(
                        text = state.error ?: "Error",
                        modifier = Modifier.padding(16.dp)
                    )
                }

                state.cart != null -> {
                    CartContent(state.cart!!)
                }
            }
        }
    }*/
}