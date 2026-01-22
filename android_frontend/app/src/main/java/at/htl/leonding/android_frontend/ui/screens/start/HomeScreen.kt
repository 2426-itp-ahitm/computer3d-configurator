// FILE: src/main/java/at/htl/leonding/android_frontend/ui/screens/start/HomeScreen.kt
package at.htl.leonding.android_frontend.ui.screens.start

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun HomeScreen(
    onCategoryClick: (String) -> Unit
) {
    val categories = listOf(
        "cpu", "gpu", "ram", "motherboard", "psu", "storage", "case", "cooler"
    )

    Column(Modifier.padding(16.dp)) {
        Text("Komponenten")

        categories.forEach { cat ->
            Text(
                text = cat.uppercase(),
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onCategoryClick(cat) }
                    .padding(vertical = 12.dp)
            )
        }
    }
}
