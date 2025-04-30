import SwiftUI

struct CartView: View {
    var body: some View {
        NavigationView {
            Text("Dein Warenkorb ist leer.")
                .font(.title3)
                .foregroundColor(.gray)
                .navigationTitle("Warenkorb")
        }
    }
}
