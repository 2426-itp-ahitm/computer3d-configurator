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
                .badge(cartVM.componentCount)

            ProfileView()
                .tabItem {
                    Label("Profil", systemImage: "person.crop.circle")
                }
        }
        .environmentObject(cartVM)
        .onAppear {
            cartVM.fetchCart()
        }
    }
}
