// FILE: src/main/java/at/htl/leonding/android_frontend/ui/screens/start/HomeScreen.kt
package at.htl.leonding.android_frontend.ui.screens.start

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.material3.Icon
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

data class ComponentTile(
    val title: String,
    val route: String,
    val color: Color
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    onCategoryClick: (String) -> Unit
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

    // später: echtes Suchen. Für jetzt: UI + optionaler Filter.
    val filteredTiles = remember(query) {
        if (query.isBlank()) tiles
        else tiles.filter { it.title.contains(query, ignoreCase = true) }
    }

    val backgroundGradient = Brush.linearGradient(
        colorStops = arrayOf(
            //0.0f to Color.White,
            0.0f to Color(0xFF282828),
            1.0f to Color(0xFF090000)
        )
    )

// 0.15f to Color(0xFF5DAEF6),
//            1.0f to Color(0xFF1B8FE8)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(backgroundGradient)
            .padding(horizontal = 32.dp)
    ) {
        Spacer(modifier = Modifier.weight(1f))


        Text(
            text = "Komponenten",
            style = MaterialTheme.typography.headlineLarge.copy(
                fontSize = 36.sp
            ),
            fontWeight = FontWeight.Bold,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Center,
            color = Color.White
        )

        Spacer(Modifier.height(36.dp))

        OutlinedTextField(
            value = query,
            onValueChange = { query = it },
            singleLine = true,
            placeholder = {
                Text(
                    text = "Search components",
                    color = Color(0xFF9E9E9E)
                )
            },
            leadingIcon = {
                Icon(
                    Icons.Filled.Search,
                    contentDescription = "Search",
                    tint = Color(0xFF9E9E9E)
                )
            },
            shape = RoundedCornerShape(8.dp),
            textStyle = MaterialTheme.typography.bodyLarge,
            colors = TextFieldDefaults.colors(
                focusedContainerColor = Color.White,
                unfocusedContainerColor = Color.White,
                focusedIndicatorColor = Color.Transparent,
                unfocusedIndicatorColor = Color.Transparent,
                focusedTextColor = Color.Black,
                unfocusedTextColor = Color.Black,
                cursorColor = Color.Black
            ),
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp) // 🔑 etwas höher
        )

        Spacer(Modifier.height(36.dp))

        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            items(filteredTiles) { tile ->
                SpotifyLikeTile(
                    title = tile.title,
                    color = tile.color,
                    onClick = { onCategoryClick(tile.route) }
                )
            }
        }

        Spacer(Modifier.height(72.dp))


    }
}

@Composable
private fun SpotifyLikeTile(
    title: String,
    color: Color,
    onClick: () -> Unit
) {
    val shape = RoundedCornerShape(12.dp)

    Box(
        modifier = Modifier
            .aspectRatio(1.8f)
            .clip(shape)
            .background(color)
            .clickable(onClick = onClick)
            .padding(12.dp)
    ) {
        Text(
            text = title,
            style = MaterialTheme.typography.titleSmall,
            fontWeight = FontWeight.Bold,
            color = Color.White,
            modifier = Modifier
                .align(Alignment.TopStart)
                .padding(end = 56.dp)
        )

        // Platzhalter für Artwork unten rechts
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