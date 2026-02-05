package at.htl.leonding.android_frontend.ui.screens.components.mapper

import at.htl.leonding.android_frontend.data.model.PowerSupplyDto
import at.htl.leonding.android_frontend.ui.screens.components.ComponentListItem

fun PowerSupplyDto.toListItem() = ComponentListItem(
    id = this.id,
    title = this.name,
    subtitle = "${this.wattage}W • ${this.efficiency ?: "Standard"} • Modular: ${if (this.modular == "true") "Ja" else "Nein"}",
    imageUrl = this.img,
    type = "psu"
)