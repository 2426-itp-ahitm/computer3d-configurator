package at.htl.leonding.android_frontend.ui.screens.components

data class ComponentListState(
    val loading: Boolean = false,
    val items: List<ComponentListItem> = emptyList(),
    val filteredItems: List<ComponentListItem> = emptyList(),
    val selectedId: Long? = null,
    val query: String = "",
    val error: String? = null
)