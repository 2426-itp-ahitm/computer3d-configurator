// FILE: ui/screens/cart/CartScreen.kt
package at.htl.leonding.android_frontend.ui.screens.cart

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import at.htl.leonding.android_frontend.data.model.CpuDto
import at.htl.leonding.android_frontend.data.model.ShoppingCartDto

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CartScreen(vm: CartViewModel) {
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
                state.loading -> CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                state.error != null -> {
                    Column(
                        modifier = Modifier.align(Alignment.Center).padding(16.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(state.error ?: "Error")
                        Spacer(Modifier.height(12.dp))
                        Button(onClick = { vm.loadCart() }) { Text("Retry") }
                    }
                }
                state.cart != null -> CartContent(state.cart!!)
                else -> Text("Kein Warenkorb", modifier = Modifier.align(Alignment.Center))
            }
        }
    }
}

@Composable
private fun CartContent(cart: ShoppingCartDto) {
    val rows = mutableListOf<CartRowModel>()

    cart.cpu?.let { cpu ->
        rows += CartRowModel(
            title = cpu.name,
            subtitle = buildCpuSubtitle(cpu),
            imageUrl = cpu.img,
            price = cpu.price
        )
    }

    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item { Text("Warenkorb #${cart.id}", style = MaterialTheme.typography.titleLarge) }
        item { Text("Gesamtpreis: ${formatEuro(cart.totalPrice)}", style = MaterialTheme.typography.titleMedium) }

        if (rows.isEmpty()) {
            item { Text("Noch keine Komponenten ausgewählt.") }
        } else {
            items(rows) { row -> CartRow(row) }
        }
    }
}

private data class CartRowModel(
    val title: String,
    val subtitle: String,
    val imageUrl: String?,
    val price: Double?
)

@Composable
private fun CartRow(row: CartRowModel) {
    Card(modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(12.dp)) {
        Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            AsyncImage(
                model = row.imageUrl,
                contentDescription = row.title,
                modifier = Modifier.size(56.dp)
            )
            Spacer(Modifier.width(12.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(row.title, style = MaterialTheme.typography.titleMedium, maxLines = 1, overflow = TextOverflow.Ellipsis)
                if (row.subtitle.isNotBlank()) {
                    Text(row.subtitle, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
            row.price?.let {
                Spacer(Modifier.width(12.dp))
                Text(formatEuro(it), style = MaterialTheme.typography.titleSmall)
            }
        }
    }
}

private fun buildCpuSubtitle(cpu: CpuDto): String {
    val base = cpu.coreClock
    val boost = cpu.boostClock
    return when {
        base != null && boost != null -> "${base} GHz • Boost ${boost} GHz"
        base != null -> "${base} GHz"
        boost != null -> "Boost ${boost} GHz"
        else -> ""
    }
}

private fun formatEuro(v: Double?): String = String.format("%.2f €", v ?: 0.0)