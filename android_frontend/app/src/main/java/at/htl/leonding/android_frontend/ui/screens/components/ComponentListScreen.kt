package at.htl.leonding.android_frontend.ui.screens.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ComponentListScreen(
    title: String,
    state: ComponentListState,
    onReload: () -> Unit,
    onSelect: (Long) -> Unit
) {
    val backgroundGradient = Brush.linearGradient(
        colorStops = arrayOf(
            0.0f to Color(0xFF3A3A3A),
            1.0f to Color(0xFF090000)
        )
    )

    Scaffold(
        containerColor = Color.Transparent,
        topBar = {
            TopAppBar(
                title = { Text(title, color = Color.White) },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color.Transparent,
                    titleContentColor = Color.White
                )
            )
        }
    ) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(backgroundGradient)
                .padding(padding)
        ) {
            when {
                state.loading -> CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))

                state.error != null -> {
                    Column(
                        modifier = Modifier
                            .align(Alignment.Center)
                            .padding(16.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(state.error ?: "Ein Fehler ist aufgetreten", color = Color.White)
                        Spacer(Modifier.height(12.dp))
                        Button(onClick = onReload) { Text("Retry") }
                    }
                }

                else -> {
                    LazyColumn(
                        contentPadding = PaddingValues(16.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        items(state.items) { item ->
                            ComponentPickRow(
                                item = item,
                                selected = item.id == state.selectedId,
                                onClick = { onSelect(item.id) }
                            )
                        }
                    }
                }
            }
        }
    }
}

private fun componentTypeColor(type: String): Color = when (type.lowercase()) {
    "cpu" -> Color(0xFFE53935)
    "gpu" -> Color(0xFF5E35B1)
    "ram" -> Color(0xFF00897B)
    "motherboard" -> Color(0xFFFF9800)
    "psu" -> Color(0xFF3949AB)
    "storage" -> Color(0xFF2E7D32)
    "case" -> Color(0xFF6D4C41)
    "cooler" -> Color(0xFF00838F)
    else -> Color(0xFF9E9E9E)
}

@Composable
fun ComponentPickRow(
    item: ComponentListItem,
    selected: Boolean,
    onClick: () -> Unit
) {
    val accent = componentTypeColor(item.type)

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = Color(0xFF1C1C1C).copy(alpha = 0.85f)
        )
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .width(5.dp)
                    .height(56.dp)
                    .clip(RoundedCornerShape(6.dp))
                    .background(accent)
            )

            Spacer(Modifier.width(12.dp))

            AsyncImage(
                model = item.imageUrl,
                contentDescription = item.title,
                modifier = Modifier
                    .size(56.dp)
                    .clip(RoundedCornerShape(10.dp))
            )

            Spacer(Modifier.width(12.dp))

            Column(Modifier.weight(1f)) {
                Text(
                    item.title,
                    style = MaterialTheme.typography.titleMedium,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    color = Color.White
                )
                if (item.subtitle.isNotBlank()) {
                    Text(
                        item.subtitle,
                        style = MaterialTheme.typography.bodySmall,
                        color = Color.White.copy(alpha = 0.7f),
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }

            RadioButton(
                selected = selected,
                onClick = onClick,
                colors = RadioButtonDefaults.colors(
                    selectedColor = accent,
                    unselectedColor = Color.White.copy(alpha = 0.5f)
                )
            )
        }
    }
}
