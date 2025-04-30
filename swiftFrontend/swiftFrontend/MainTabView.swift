import SwiftUI

struct MainTabView: View {
    var body: some View {
        TabView {
            ComponentOverviewView()
                .tabItem {
                    Label("Start", systemImage: "square.grid.2x2")
                }
            
            CartView()
                .tabItem {
                    Label("Warenkorb", systemImage: "cart")
                }
            
            ProfileView()
                .tabItem {
                    Label("Profil", systemImage: "person.crop.circle")
                }
        }
    }
}
