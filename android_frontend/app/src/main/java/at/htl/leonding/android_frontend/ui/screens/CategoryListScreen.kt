package at.htl.leonding.android_frontend.ui.screens.category

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun CategoryListScreen(
    category: String,
    onBack: () -> Unit,
    onItemClick: (Long) -> Unit
) {
    Column(Modifier.padding(16.dp)) {
        Text("Kategorie: ${category.uppercase()} (Back)")
        Text(
            text = "← Zurück",
            modifier = Modifier
                .clickable { onBack() }
                .padding(vertical = 12.dp)
        )

        // Platzhalter-Daten (später per API laden)
        val items = listOf(
            1L to "$category item 1",
            2L to "$category item 2",
            3L to "$category item 3"
        )

        items.forEach { (id, name) ->
            Text(
                text = name,
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onItemClick(id) }
                    .padding(vertical = 12.dp)
            )
        }
    }
}
