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
import at.htl.leonding.android_frontend.ui.screens.cpu.CpuListState

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CpuListScreen(
    state: CpuListState,
    onReload: () -> Unit
) {
    Scaffold(
        topBar = { TopAppBar(title = { Text("CPUs") }) }
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
                            CpuRowSimple(cpu)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun CpuRowSimple(cpu: CpuDto) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(Modifier.padding(12.dp)) {
            Text(cpu.name)
            cpu.price?.let { Text(String.format("%.2f €", it)) }
        }
    }
}
