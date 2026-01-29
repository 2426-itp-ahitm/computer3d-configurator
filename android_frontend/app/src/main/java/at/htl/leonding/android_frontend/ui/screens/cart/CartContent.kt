package at.htl.leonding.android_frontend.ui.screens.cart

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.dp
import at.htl.leonding.android_frontend.data.model.ShoppingCartDto

@Composable
private fun CartContent(cart: ShoppingCartDto) {/*
    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {

        item {
            Text(
                text = "Gesamtpreis: ${cart.totalPrice ?: 0.0} €",
                style = MaterialTheme.typography.titleMedium
            )
        }

        cart.cpu?.let { cpu ->
            item {
                CartItemCard(
                    title = cpu.name,
                    subtitle = buildCpuSubtitle(cpu),
                    price = cpu.price
                )
            }
        }

        // später: gpu, ram, motherboard, ...
    }*/
}