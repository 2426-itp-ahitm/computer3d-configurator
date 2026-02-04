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

    // CPU
    cart.cpu?.let {
        rows += CartRowModel(it.name, buildCpuSubtitle(it), it.img, it.price)
    }
    // GPU
    cart.gpu?.let {
        rows += CartRowModel(it.name, "${it.chipset} • ${it.memory}GB", it.img, it.price)
    }
    // RAM
    cart.ram?.let {
        rows += CartRowModel(it.name, "${it.moduleCount}x ${it.gbPerModule}GB • ${it.type}", it.img, it.price)
    }
    // Motherboard
    cart.motherboard?.let {
        rows += CartRowModel(it.name, "${it.socket} • ${it.formFactor}", it.img, it.price)
    }
    // Storage
    cart.storage?.let {
        rows += CartRowModel(it.name, "${it.capacity}GB • ${it.type}", it.img, it.price)
    }
    // PSU
    cart.psu?.let {
        rows += CartRowModel(it.name, "${it.wattage}W • ${it.efficiency}", it.img, it.price)
    }
    // Cooler
    cart.cooler?.let {
        rows += CartRowModel(it.name, "Luftkühler", it.img, it.price)
    }

    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text("Konfiguration #${cart.id}", style = MaterialTheme.typography.headlineSmall)
        }

        if (rows.isEmpty()) {
            item {
                Card(modifier = Modifier.fillMaxWidth()) {
                    Text("Dein Warenkorb ist noch leer.", modifier = Modifier.padding(16.dp))
                }
            }
        } else {
            items(rows) { row -> CartRow(row) }
        }

        item {
            Divider(Modifier.padding(vertical = 8.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("Gesamtbetrag", style = MaterialTheme.typography.titleLarge)
                Text(formatEuro(cart.totalPrice), style = MaterialTheme.typography.titleLarge, color = MaterialTheme.colorScheme.primary)
            }
        }
    }
}



data class CartRowModel(
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

fun buildCpuSubtitle(cpu: CpuDto): String {
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