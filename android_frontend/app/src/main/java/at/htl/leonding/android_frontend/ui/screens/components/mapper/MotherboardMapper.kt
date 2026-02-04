package at.htl.leonding.android_frontend.ui.screens.components.mapper

import at.htl.leonding.android_frontend.data.model.MotherboardDto
import at.htl.leonding.android_frontend.ui.screens.components.ComponentListItem

fun MotherboardDto.toListItem() = ComponentListItem(
    id = this.id,
    title = this.name,
    subtitle = "${this.socket} • ${this.formFactor} • ${this.ramType}",
    imageUrl = this.img
)