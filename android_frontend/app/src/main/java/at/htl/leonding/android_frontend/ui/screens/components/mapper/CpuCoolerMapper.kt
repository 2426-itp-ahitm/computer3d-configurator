package at.htl.leonding.android_frontend.ui.screens.components.mapper

import at.htl.leonding.android_frontend.data.model.CpuCoolerDto
import at.htl.leonding.android_frontend.ui.screens.components.ComponentListItem

fun CpuCoolerDto.toListItem() = ComponentListItem(
    id = this.id,
    title = this.name,
    subtitle = buildSubtitle(),
    imageUrl = this.img,
    type = "cooler"
)

private fun CpuCoolerDto.buildSubtitle(): String {
    val rpmPart = when {
        minRpm != null && maxRpm != null && minRpm != maxRpm ->
            "${minRpm}-${maxRpm} RPM"
        maxRpm != null ->
            "${maxRpm} RPM"
        else -> null
    }

    val noisePart = when {
        minNoiseLevel != null && maxNoiseLevel != null && minNoiseLevel != maxNoiseLevel ->
            "${minNoiseLevel}-${maxNoiseLevel} dB"
        maxNoiseLevel != null ->
            "${maxNoiseLevel} dB"
        else -> null
    }

    return listOfNotNull(rpmPart, noisePart, color)
        .joinToString(" • ")
}
