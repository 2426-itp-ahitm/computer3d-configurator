import SwiftUI

struct RAMListView: View {
    @EnvironmentObject var cartVM: ShoppingCartViewModel
    @State private var rams: [RAM] = []
    @State private var isLoading = true
    @State private var errorMessage: String?
    @State private var selectedRamId: Int?

    private let ramService = RAMService()
    private let cartService = ShoppingCartService()
    private let cartId = 1

    var body: some View {
        NavigationView {
            content
                .navigationTitle("RAM Module")
        }
        .onAppear {
            loadRAMs()
            loadSelectedRAM()
        }
    }

    @ViewBuilder
    private var content: some View {
        if isLoading {
            ProgressView()
        } else if let errorMessage = errorMessage {
            VStack {
                Text("Fehler: \(errorMessage)")
                    .foregroundColor(.red)
                Button("Erneut versuchen") {
                    loadRAMs()
                    loadSelectedRAM()
                }
                .padding()
            }
        } else {
            List(rams) { ram in
                HStack {
                    Image(systemName: selectedRamId == ram.id ? "checkmark.circle.fill" : "circle")
                        .foregroundColor(.blue)
                        .frame(width: 20)

                    AsyncImage(url: URL(string: ram.img)) { image in
                        image.resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 80, height: 80)
                    } placeholder: {
                        ProgressView()
                            .frame(width: 80, height: 80)
                    }

                    VStack(alignment: .leading) {
                        Text(ram.name)
                            .font(.headline)
                        Text("\(ram.gbPerModule) GB \(ram.type)")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        if let price = ram.price {
                            Text(String(format: "%.2f €", price))
                                .font(.subheadline)
                        } else {
                            Text("Preis unbekannt")
                                .font(.subheadline)
                                .foregroundColor(.gray)
                        }
                    }
                    Spacer()
                }
                .padding(.vertical, 8)
                .contentShape(Rectangle())
                .onTapGesture {
                    if selectedRamId == ram.id {
                        // Bereits ausgewählt → entfernen
                        removeRamFromCart(cartId: cartId)
                    } else {
                        // Neue Auswahl → hinzufügen
                        selectedRamId = ram.id
                        addRamToCart(cartId: cartId, ramId: ram.id)
                    }
                }
            }
        }
    }

    private func loadRAMs() {
        isLoading = true
        errorMessage = nil

        ramService.fetchRAMs { result in
            DispatchQueue.main.async {
                isLoading = false
                switch result {
                case .success(let rams):
                    self.rams = rams
                case .failure(let error):
                    self.errorMessage = error.localizedDescription
                }
            }
        }
    }

    private func loadSelectedRAM() {
        cartService.fetchCart(cartId: cartId) { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let cart):
                    selectedRamId = cart.ram?.id
                case .failure(let error):
                    print("Fehler beim Laden des Warenkorbs: \(error.localizedDescription)")
                }
            }
        }
    }

    private func addRamToCart(cartId: Int, ramId: Int) {
        let urlString = "\(Config.backendBaseURL)/api/shoppingcart/update-cart/\(cartId)/ram/\(ramId)"
        guard let url = URL(string: urlString) else {
            print("Ungültige URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "PUT"

        URLSession.shared.dataTask(with: request) { _, response, error in
            if let error = error {
                print("Fehler beim Hinzufügen von RAM: \(error)")
            } else if let httpResponse = response as? HTTPURLResponse {
                print("Statuscode: \(httpResponse.statusCode)")
                if httpResponse.statusCode == 200 {
                    print("RAM erfolgreich zum Warenkorb hinzugefügt.")
                    DispatchQueue.main.async {
                        cartVM.fetchCart()
                    }
                } else {
                    print("Fehler beim Hinzufügen von RAM – Statuscode: \(httpResponse.statusCode)")
                }
            }
        }.resume()
    }

    private func removeRamFromCart(cartId: Int) {
        let urlString = "\(Config.backendBaseURL)/api/shoppingcart/remove-component/\(cartId)/ram"
        guard let url = URL(string: urlString) else {
            print("Ungültige URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"

        URLSession.shared.dataTask(with: request) { _, response, error in
            if let error = error {
                print("Fehler beim Entfernen von RAM: \(error)")
            } else if let httpResponse = response as? HTTPURLResponse {
                print("Statuscode: \(httpResponse.statusCode)")
                if httpResponse.statusCode == 200 {
                    print("RAM erfolgreich entfernt.")
                    DispatchQueue.main.async {
                        selectedRamId = nil
                        cartVM.fetchCart()
                    }
                } else {
                    print("Fehler beim Entfernen von RAM – Statuscode: \(httpResponse.statusCode)")
                }
            }
        }.resume()
    }
}
