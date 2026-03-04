package at.htl.leonding.android_frontend.ui.screens.components.mapper

import at.htl.leonding.android_frontend.data.model.GpuDto
import at.htl.leonding.android_frontend.ui.screens.components.ComponentListItem

fun GpuDto.toListItem() = ComponentListItem(
    id = this.id,
    title = this.name,
    subtitle = "${this.chipset} • ${this.memory} GB GDDR6 • ${this.boostClock} MHz Boost",
    imageUrl = this.img,
    type = "gpu"
)