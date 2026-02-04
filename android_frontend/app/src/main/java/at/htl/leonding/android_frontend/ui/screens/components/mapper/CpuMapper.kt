package at.htl.leonding.android_frontend.ui.screens.components.mapper

// FILE: ui/screens/cpu/CpuMappers.kt

import at.htl.leonding.android_frontend.data.model.CpuDto
import at.htl.leonding.android_frontend.ui.screens.components.ComponentListItem

fun CpuDto.toListItem(): ComponentListItem {
    val subtitle = when {
        coreClock != null && boostClock != null -> "${coreClock} GHz • Boost ${boostClock} GHz"
        coreClock != null -> "${coreClock} GHz"
        boostClock != null -> "Boost ${boostClock} GHz"
        else -> ""
    }
    return ComponentListItem(
        id = cpuId,
        title = name,
        subtitle = subtitle,
        imageUrl = img
    )
}
