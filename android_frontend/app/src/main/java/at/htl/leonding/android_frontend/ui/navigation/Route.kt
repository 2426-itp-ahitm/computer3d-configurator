// FILE: ui/navigation/Route.kt
package at.htl.leonding.android_frontend.ui.navigation

object Route {
    const val HOME = "home"
    const val CART = "cart"
    const val PROFILE = "profile"

    // 1 generische Komponentenseite
    const val COMPONENTS = "components"
    const val COMPONENTS_TYPE = "components/{type}"

    fun components(type: String) = "components/$type"
}

object ComponentType {
    const val CPU = "cpu"
    const val GPU = "gpu"
    const val RAM = "ram"
    const val MOTHERBOARD = "motherboard"
    const val PSU = "psu"
    const val STORAGE = "storage"
    const val CASE = "case"
    const val COOLER = "cooler"
}
