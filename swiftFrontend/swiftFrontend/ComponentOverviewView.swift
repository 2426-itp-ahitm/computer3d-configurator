import SwiftUI

struct ComponentOverviewView: View {
    // Spalten für das Grid (2 pro Reihe)
    let columns = [GridItem(.flexible()), GridItem(.flexible())]
    
    var body: some View {
        NavigationView {
            ScrollView {
                LazyVGrid(columns: columns, spacing: 20) {
                    ForEach(Component.allCases, id: \.self) { component in
                        NavigationLink(destination: component.destinationView) {
                            componentCard(name: component.rawValue, image: component.systemImage)
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("PC-Konfigurator")
        }
    }

    func componentCard(name: String, image: String) -> some View {
        VStack {
            Image(systemName: image)
                .resizable()
                .scaledToFit()
                .frame(height: 50)
                .padding()
            Text(name)
                .font(.headline)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color.gray.opacity(0.1))
        .cornerRadius(12)
        .shadow(radius: 2)
    }
}
