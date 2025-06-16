import SwiftUI

struct MainTabView: View {
    @StateObject private var cartVM = ShoppingCartViewModel()

    var body: some View {
        TabView {
            ComponentOverviewView()
                .tabItem {
                    Label("Start", systemImage: "square.grid.2x2")
                }

            ShoppingCartView()
                .tabItem {
                    Label("Warenkorb", systemImage: "cart")
                }
                .badge(cartVM.componentCount) // 🟢 Hier wird die Badge angezeigt

            ProfileView()
                .tabItem {
                    Label("Profil", systemImage: "person.crop.circle")
                }
        }
        .onAppear {
            cartVM.fetchCart() // lädt bei App-Start
        }
    }
}
