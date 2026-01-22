// FILE: src/main/java/at/htl/leonding/android_frontend/ui/navigation/Routes.kt
package at.htl.leonding.android_frontend.ui.navigation

sealed class Route(val route: String, val label: String) {
    data object Home : Route("home", "Home")
    data object Cart : Route("cart", "Cart")
    data object Profile : Route("profile", "Profile")

    // Dedicated route for the existing CPU list screen
    data object CpuList : Route("cpu_list", "CPUs")

    // Generic category list for everything else
    data object CategoryList : Route("category/{category}", "CategoryList") {
        fun create(category: String) = "category/$category"
    }

    // Optional detail route you already had
    data object ComponentDetail : Route("detail/{category}/{id}", "Detail") {
        fun create(category: String, id: Long) = "detail/$category/$id"
    }
}
