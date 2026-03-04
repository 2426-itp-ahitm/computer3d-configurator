package at.htl.leonding.android_frontend.ui.screens.components.mapper


import at.htl.leonding.android_frontend.data.model.HarddriveDto
import at.htl.leonding.android_frontend.ui.screens.components.ComponentListItem

fun HarddriveDto.toListItem() = ComponentListItem(
    id = this.id,
    title = this.name,
    subtitle = "${this.capacity} GB • ${this.type} • ${this.formFactor} • ${this.model ?: ""}",
    imageUrl = this.img,
    type = "storage"
)