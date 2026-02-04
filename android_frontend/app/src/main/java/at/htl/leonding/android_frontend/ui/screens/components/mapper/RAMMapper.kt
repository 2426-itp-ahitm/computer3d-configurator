package at.htl.leonding.android_frontend.ui.screens.components.mapper

import at.htl.leonding.android_frontend.data.model.RamDto
import at.htl.leonding.android_frontend.ui.screens.components.ComponentListItem

fun RamDto.toListItem() = ComponentListItem(
    id = this.id,
    title = this.name,
    subtitle = "${this.moduleCount}x ${this.gbPerModule} GB • ${this.type}-${this.clockSpeed}}",
    imageUrl = this.img
)