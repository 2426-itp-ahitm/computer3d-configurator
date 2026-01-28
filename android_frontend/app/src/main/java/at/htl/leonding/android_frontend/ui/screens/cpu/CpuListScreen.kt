// CpuListOnlyScreen.kt  (neu)
package at.htl.leonding.android_frontend.ui.screens.cpu

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import at.htl.leonding.android_frontend.data.model.CpuDto
import androidx.compose.foundation.clickable
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextOverflow
import coil.compose.AsyncImage

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CpuListScreen(
    state: CpuListState,
    onReload: () -> Unit,
    onSelectCpu: (Long) -> Unit,
    onAddToCart: () -> Unit
) {
    Scaffold(
        topBar = { TopAppBar(title = { Text("CPUs") }) },
        bottomBar = {
            Surface(shadowElevation = 6.dp) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(12.dp),
                    horizontalArrangement = Arrangement.End
                ) {
                    Button(
                        onClick = onAddToCart,
                        enabled = state.selectedCpuId != null
                    ) {
                        Text("Zum Warenkorb hinzufügen")
                    }
                }
            }
        }
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
                    Column(Modifier.padding(16.dp)) {
                        Text(state.error)
                        Spacer(Modifier.height(12.dp))
                        Button(onClick = onReload) { Text("Retry") }
                    }
                }

                else -> {
                    LazyColumn(
                        contentPadding = PaddingValues(16.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        items(state.items) { cpu ->
                            CpuPickRow(
                                cpu = cpu,
                                selected = (cpu.cpuId == state.selectedCpuId),
                                onClick = { onSelectCpu(cpu.cpuId) }
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun CpuPickRow(
    cpu: CpuDto,
    selected: Boolean,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(12.dp)
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Bild links
            AsyncImage(
                model = cpu.img, // falls Feld anders heißt: anpassen
                contentDescription = cpu.name,
                modifier = Modifier
                    .size(56.dp)
                    .clip(RoundedCornerShape(10.dp))
            )

            Spacer(Modifier.width(12.dp))

            // Text Mitte (Name + Taktrate)
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = cpu.name,
                    style = MaterialTheme.typography.titleMedium,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )

                // Taktrate (je nach Dto Feldnamen anpassen)
                Text(
                    text = buildClockText(cpu),
                    style = MaterialTheme.typography.bodySmall,
                    color = Color(0xFF757575),
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
            }

            // Radio rechts (alle verbunden via selectedCpuId)
            RadioButton(
                selected = selected,
                onClick = onClick
            )
        }
    }
}

private fun buildClockText(cpu: CpuDto): String {

    val base = cpu.coreClock
    val boost = cpu.boostClock

    return when {
        base != null && boost != null -> "${base} GHz • Boost ${boost} GHz"
        base != null -> "${base} GHz"
        boost != null -> "Boost ${boost} GHz"
        else -> "" // Insufficient data to verify Feldnamen
    }
}