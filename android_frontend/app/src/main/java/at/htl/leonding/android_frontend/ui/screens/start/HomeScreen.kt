package at.htl.leonding.android_frontend.ui.screens.start

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import at.htl.leonding.android_frontend.ui.screens.components.ComponentListItem
import at.htl.leonding.android_frontend.ui.screens.components.ComponentPickRow

data class ComponentTile(
    val title: String,
    val route: String,
    val color: Color
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    onCategoryClick: (String) -> Unit,
    // Diese Liste müsste von deinem ViewModel kommen (alle verfügbaren Komponenten)
    allComponents: List<ComponentListItem> = emptyList(),
    selectedId: Long? = null,
    onComponentSelect: (Long) -> Unit = {}
) {
    val tiles = listOf(
        ComponentTile("CPU", "cpu", Color(0xFFE53935)),
        ComponentTile("GPU", "gpu", Color(0xFF5E35B1)),
        ComponentTile("RAM", "ram", Color(0xFF00897B)),
        ComponentTile("Motherboard", "motherboard", Color(0xFFFB8C00)),
        ComponentTile("PSU", "psu", Color(0xFF3949AB)),
        ComponentTile("Storage", "storage", Color(0xFF2E7D32)),
        ComponentTile("Case", "case", Color(0xFF6D4C41)),
        ComponentTile("Cooler", "cooler", Color(0xFF00838F))
    )

    var query by rememberSaveable { mutableStateOf("") }
    val isSearching = query.isNotBlank()

    val backgroundGradient = Brush.linearGradient(
        colorStops = arrayOf(
            0.0f to Color(0xFF3A3A3A),
            1.0f to Color(0xFF090000)
        )
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(backgroundGradient)
            .padding(horizontal = 32.dp)
    ) {
        if (!isSearching) {
            Spacer(modifier = Modifier.weight(1f))
            Text(
                text = "Komponenten",
                style = MaterialTheme.typography.headlineLarge.copy(fontSize = 36.sp),
                fontWeight = FontWeight.Bold,
                modifier = Modifier.fillMaxWidth(),
                textAlign = TextAlign.Center,
                color = Color.White
            )
            Spacer(Modifier.height(36.dp))
        } else {
            Spacer(Modifier.height(56.dp))
        }

        OutlinedTextField(
            value = query,
            onValueChange = { query = it },
            singleLine = true,
            placeholder = { Text(text = "Search components", color = Color(0xFF9E9E9E)) },
            leadingIcon = { Icon(Icons.Filled.Search, contentDescription = "Search", tint = Color(0xFF9E9E9E)) },
            shape = RoundedCornerShape(8.dp),
            textStyle = MaterialTheme.typography.bodyLarge,
            colors = TextFieldDefaults.colors(
                focusedContainerColor = Color.White,
                unfocusedContainerColor = Color.White,
                focusedTextColor = Color.Black,
                unfocusedTextColor = Color.Black,
                cursorColor = Color.Black
            ),
            modifier = Modifier.fillMaxWidth().height(52.dp)
        )

        Spacer(Modifier.height(36.dp))

        if (!isSearching) {
            // Normale Ansicht: Kacheln
            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                items(tiles) { tile ->
                    SpotifyLikeTile(
                        title = tile.title,
                        color = tile.color,
                        onClick = { onCategoryClick(tile.route) }
                    )
                }
            }
            Spacer(Modifier.height(72.dp))
        } else {
            // Such-Ansicht: Liste mit Radio-Buttons
            val filteredComponents =
                allComponents.filter { it.title.contains(query, ignoreCase = true) }

            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items(filteredComponents) { item ->
                    ComponentPickRow(
                        item = item,
                        selected = item.id == selectedId,
                        onClick = { onComponentSelect(item.id) }
                    )
                }
            }
        }
    }
}

@Composable
private fun SpotifyLikeTile(
    title: String,
    color: Color,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .aspectRatio(1.8f)
            .clip(RoundedCornerShape(12.dp))
            .background(color)
            .clickable(onClick = onClick)
            .padding(12.dp)
    ) {
        Text(
            text = title,
            style = MaterialTheme.typography.titleSmall,
            fontWeight = FontWeight.Bold,
            color = Color.White,
            modifier = Modifier.align(Alignment.TopStart).padding(end = 56.dp)
        )
        Box(
            modifier = Modifier
                .size(56.dp)
                .align(Alignment.BottomEnd)
                .offset(x = 10.dp, y = 10.dp)
                .clip(RoundedCornerShape(10.dp))
                .background(Color.White.copy(alpha = 0.25f))
        )
    }
}
