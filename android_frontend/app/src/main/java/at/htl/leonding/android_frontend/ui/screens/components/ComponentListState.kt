package at.htl.leonding.android_frontend.ui.screens.components

data class ComponentListState(
    val loading: Boolean = false,
    val items: List<ComponentListItem> = emptyList(),
    val error: String? = null,
    val selectedId: Long? = null
)
