// FILE: ui/screens/cart/CartScreen.kt
package at.htl.leonding.android_frontend.ui.screens.cart

import android.content.Context
import android.graphics.Paint
import android.graphics.pdf.PdfDocument
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import at.htl.leonding.android_frontend.data.model.CpuDto
import at.htl.leonding.android_frontend.data.model.ShoppingCartDto

@Composable
fun CartScreen(vm: CartViewModel) {
    val state by vm.state.collectAsState()
    val context = LocalContext.current
    val scope = rememberCoroutineScope()

    val backgroundGradient = Brush.linearGradient(
        colorStops = arrayOf(
            0.0f to Color(0xFF3A3A3A),
            1.0f to Color(0xFF090000)
        )
    )

    // SAF "Speichern unter..." Dialog (keine Storage-Permission nötig)
    val createPdfLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.CreateDocument("application/pdf")
    ) { uri ->
        val cart = state.cart
        if (uri != null && cart != null) {
            scope.launch(Dispatchers.IO) {
                writeCartPdfToUri(context, cart, uri)
            }
        }
    }

    Scaffold(
        containerColor = Color.Transparent,
        bottomBar = {
            val enabled = state.cart != null && !state.loading && state.error == null
            Surface(color = Color.Transparent) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color.Transparent)
                        .padding(horizontal = 32.dp, vertical = 14.dp)
                ) {
                    Button(
                        onClick = {
                            val id = state.cart?.id ?: 0
                            createPdfLauncher.launch("Konfiguration-$id.pdf")
                        },
                        enabled = enabled,
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(14.dp)
                    ) {
                        Text("PDF herunterladen")
                    }
                }
            }
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(backgroundGradient)
                .padding(padding)
                .padding(horizontal = 32.dp)
        ) {
            Spacer(modifier = Modifier.weight(1f))

            Text(
                text = "Warenkorb",
                style = MaterialTheme.typography.headlineLarge.copy(fontSize = 36.sp),
                fontWeight = FontWeight.Bold,
                modifier = Modifier.fillMaxWidth(),
                textAlign = TextAlign.Center,
                color = Color.White
            )

            Spacer(Modifier.height(36.dp))

            Box(modifier = Modifier.fillMaxWidth()) {
                when {
                    state.loading -> CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
                    state.error != null -> {
                        Column(
                            modifier = Modifier
                                .align(Alignment.Center)
                                .padding(16.dp),
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Text(state.error ?: "Error", color = Color.White)
                            Spacer(Modifier.height(12.dp))
                            Button(onClick = { vm.loadCart() }) { Text("Retry") }
                        }
                    }

                    state.cart != null -> CartContent(state.cart!!)
                    else -> Text(
                        "Kein Warenkorb",
                        modifier = Modifier.align(Alignment.Center),
                        color = Color.White
                    )
                }
            }

            Spacer(modifier = Modifier.weight(2f))
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
private fun CartContent(cart: ShoppingCartDto) {
    val rows = mutableListOf<CartRowModel>()

    cart.cpu?.let { rows += CartRowModel("cpu", it.name, buildCpuSubtitle(it), it.img) }
    cart.gpu?.let { rows += CartRowModel("gpu", it.name, "${it.chipset} • ${it.memory}GB", it.img) }
    cart.ram?.let {
        rows += CartRowModel(
            "ram",
            it.name,
            "${it.moduleCount}x ${it.gbPerModule}GB • ${it.type}",
            it.img
        )
    }
    cart.motherboard?.let {
        rows += CartRowModel(
            "motherboard",
            it.name,
            "${it.socket} • ${it.formFactor}",
            it.img
        )
    }
    cart.storage?.let {
        rows += CartRowModel(
            "storage",
            it.name,
            "${it.capacity}GB • ${it.type}",
            it.img
        )
    }
    cart.psu?.let {
        rows += CartRowModel(
            "psu",
            it.name,
            "${it.wattage}W • ${it.efficiency}",
            it.img
        )
    }
    cart.cooler?.let { rows += CartRowModel("cooler", it.name, "Luftkühler", it.img) }

    LazyColumn(
        modifier = Modifier.fillMaxWidth(),
        contentPadding = PaddingValues(bottom = 8.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        if (rows.isEmpty()) {
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = Color(0xFF1C1C1C).copy(alpha = 0.85f)
                    )
                ) {
                    Text(
                        "Dein Warenkorb ist noch leer.",
                        modifier = Modifier.padding(16.dp),
                        color = Color.White
                    )
                }
            }
        } else {
            items(rows) { row -> CartRow(row) }
        }
    }
}

data class CartRowModel(
    val type: String,
    val title: String,
    val subtitle: String,
    val imageUrl: String?
)

@Composable
private fun CartRow(row: CartRowModel) {
    val accent = componentTypeColor(row.type)

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = Color(0xFF1C1C1C).copy(alpha = 0.85f)
        )
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 14.dp, vertical = 10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .width(3.dp)
                    .height(44.dp)
                    .clip(RoundedCornerShape(999.dp))
                    .background(accent.copy(alpha = 0.90f))
            )

            Spacer(Modifier.width(12.dp))

            Box(
                modifier = Modifier
                    .size(56.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color.White.copy(alpha = 0.06f)),
                contentAlignment = Alignment.Center
            ) {
                AsyncImage(
                    model = row.imageUrl,
                    contentDescription = row.title,
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(6.dp)
                )
            }

            Spacer(Modifier.width(12.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    row.title,
                    style = MaterialTheme.typography.titleMedium,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    color = Color.White
                )
                if (row.subtitle.isNotBlank()) {
                    Text(
                        row.subtitle,
                        style = MaterialTheme.typography.bodySmall,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis,
                        color = Color.White.copy(alpha = 0.70f)
                    )
                }
            }

            Spacer(Modifier.width(12.dp))

            Surface(
                shape = RoundedCornerShape(999.dp),
                color = accent.copy(alpha = 0.18f)
            ) {
                Text(
                    text = row.type.uppercase(),
                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp),
                    color = accent.copy(alpha = 0.95f),
                    style = MaterialTheme.typography.labelSmall
                )
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

/**
 * Schreibt ein simples PDF (Textliste) in die vom Nutzer gewählte Uri.
 * Keine Bilder; nur Titel + Komponenten.
 */
private fun writeCartPdfToUri(context: Context, cart: ShoppingCartDto, uri: android.net.Uri) {
    val doc = PdfDocument()

    val pageWidth = 595   // A4 @ ~72dpi
    val pageHeight = 842

    val titlePaint = Paint().apply {
        textSize = 18f
        isFakeBoldText = true
    }
    val textPaint = Paint().apply {
        textSize = 12f
    }

    val rows = buildCartRows(cart)

    var y = 60f
    var pageNumber = 1

    fun newPage(): PdfDocument.Page {
        val info = PdfDocument.PageInfo.Builder(pageWidth, pageHeight, pageNumber).create()
        return doc.startPage(info)
    }

    var page = newPage()
    var canvas = page.canvas

    canvas.drawText("Warenkorb Konfiguration #${cart.id}", 40f, 40f, titlePaint)

    for (r in rows) {
        val line1 = "${r.type.uppercase()}: ${r.title}"
        val line2 = r.subtitle

        if (y > pageHeight - 80f) {
            doc.finishPage(page)
            pageNumber++
            page = newPage()
            canvas = page.canvas
            canvas.drawText("Warenkorb Konfiguration #${cart.id}", 40f, 40f, titlePaint)
            y = 60f
        }

        canvas.drawText(line1, 40f, y, textPaint)
        y += 16f
        if (line2.isNotBlank()) {
            canvas.drawText(line2, 60f, y, textPaint)
            y += 18f
        } else {
            y += 6f
        }
    }

    val total = cart.totalPrice
    if (y > pageHeight - 60f) {
        doc.finishPage(page)
        pageNumber++
        page = newPage()
        canvas = page.canvas
        y = 60f
    }
    canvas.drawText("Gesamt: ${String.format("%.2f €", total ?: 0.0)}", 40f, y + 10f, titlePaint)

    doc.finishPage(page)

    context.contentResolver.openOutputStream(uri)?.use { out ->
        doc.writeTo(out)
    }

    doc.close()
}

private data class PdfRow(val type: String, val title: String, val subtitle: String)

private fun buildCartRows(cart: ShoppingCartDto): List<PdfRow> {
    val rows = mutableListOf<PdfRow>()
    cart.cpu?.let { rows += PdfRow("cpu", it.name, buildCpuSubtitle(it)) }
    cart.gpu?.let { rows += PdfRow("gpu", it.name, "${it.chipset} • ${it.memory}GB") }
    cart.ram?.let {
        rows += PdfRow(
            "ram",
            it.name,
            "${it.moduleCount}x ${it.gbPerModule}GB • ${it.type}"
        )
    }
    cart.motherboard?.let {
        rows += PdfRow(
            "motherboard",
            it.name,
            "${it.socket} • ${it.formFactor}"
        )
    }
    cart.storage?.let { rows += PdfRow("storage", it.name, "${it.capacity}GB • ${it.type}") }
    cart.psu?.let { rows += PdfRow("psu", it.name, "${it.wattage}W • ${it.efficiency}") }
    cart.cooler?.let { rows += PdfRow("cooler", it.name, "Luftkühler") }
    return rows
}
