import SwiftUI

struct MotherboardListView: View {
    @State private var motherboards: [Motherboard] = []
    @State private var selectedMotherboard: Motherboard? = nil // Hier wird das ausgewählte Motherboard gespeichert
    private let service = MotherboardService()

    var body: some View {
        NavigationView {
            List(motherboards) { motherboard in
                HStack {
                    AsyncImage(url: URL(string: motherboard.img)) { image in
                        image.resizable()
                    } placeholder: {
                        ProgressView()
                    }
                    .frame(width: 80, height: 80)
                    .cornerRadius(10)

                    VStack(alignment: .leading) {
                        Text(motherboard.name)
                            .font(.headline)
                        Text("\(motherboard.price, specifier: "%.2f") €")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }

                    Spacer()

                    // Radio-Button (Picker) neben jedem Motherboard
                    if selectedMotherboard?.id == motherboard.id {
                        Image(systemName: "circle.fill") // ausgewählt
                            .foregroundColor(.blue)
                            .onTapGesture {
                                selectedMotherboard = nil // Deaktiviert die Auswahl, falls der Radio-Button erneut angetippt wird
                            }
                    } else {
                        Image(systemName: "circle")
                            .foregroundColor(.gray)
                            .onTapGesture {
                                selectedMotherboard = motherboard // Wählt das Motherboard aus
                            }
                    }
                }
            }
            .navigationTitle("Motherboards")
            .onAppear {
                service.fetchMotherboards { result in
                    switch result {
                    case .success(let fetchedMotherboards):
                        DispatchQueue.main.async {
                            self.motherboards = fetchedMotherboards
                        }
                    case .failure(let error):
                        print("Error fetching motherboards: \(error)")
                    }
                }
            }
        }
    }
}

struct MotherboardListView_Previews: PreviewProvider {
    static var previews: some View {
        MotherboardListView()
    }
}
