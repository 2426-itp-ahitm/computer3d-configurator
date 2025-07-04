import SwiftUI

struct MotherboardListView: View {
    @EnvironmentObject var cartVM: ShoppingCartViewModel
    @State private var motherboards: [Motherboard] = []
    @State private var isLoading = true
    @State private var errorMessage: String?
    @State private var selectedMotherboardId: Int?
    @State private var cpuSocket: String?

    private let motherboardService = MotherboardService()
    private let cartService = ShoppingCartService()
    private let cartId = 1

    var body: some View {
        NavigationView {
            content
                .navigationTitle("Mainboards")
        }
        .onAppear {
            loadSelectedMotherboard()
        }
        .onChange(of: cartVM.cart?.cpu?.socket) { newSocket in
            cpuSocket = newSocket
            loadMotherboards()
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
                    loadMotherboards()
                }
                .padding()
            }
        } else {
            List(motherboards) { motherboard in
                HStack {
                    Image(systemName: selectedMotherboardId == motherboard.id ? "checkmark.circle.fill" : "circle")
                        .foregroundColor(.blue)
                        .frame(width: 20)

                    AsyncImage(url: URL(string: motherboard.img)) { image in
                        image.resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 80, height: 80)
                    } placeholder: {
                        ProgressView()
                            .frame(width: 80, height: 80)
                    }

                    VStack(alignment: .leading) {
                        Text(motherboard.name)
                            .font(.headline)
                        Text("\(motherboard.formFactor) • \(motherboard.ramType) • \(motherboard.color)")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        Text(String(format: "%.2f €", motherboard.price))
                            .font(.subheadline)
                    }
                    Spacer()
                }
                .padding(.vertical, 8)
                .contentShape(Rectangle())
                .onTapGesture {
                    if selectedMotherboardId == motherboard.id {
                        // Bereits ausgewählt → entfernen
                        removeMotherboardFromCart(cartId: cartId)
                    } else {
                        // Neue Auswahl → hinzufügen
                        selectedMotherboardId = motherboard.id
                        addMotherboardToCart(cartId: cartId, motherboardId: motherboard.id)
                    }
                }
            }
        }
    }

    private func loadMotherboards() {
        isLoading = true
        errorMessage = nil

        if let socket = cpuSocket {
            motherboardService.fetchMotherboardsBySocket(socket: socket) { result in
                DispatchQueue.main.async {
                    isLoading = false
                    switch result {
                    case .success(let motherboards):
                        self.motherboards = motherboards
                    case .failure(let error):
                        self.errorMessage = error.localizedDescription
                    }
                }
            }
        } else {
            motherboardService.fetchMotherboards { result in
                DispatchQueue.main.async {
                    isLoading = false
                    switch result {
                    case .success(let motherboards):
                        self.motherboards = motherboards
                    case .failure(let error):
                        self.errorMessage = error.localizedDescription
                    }
                }
            }
        }
    }

    private func loadSelectedMotherboard() {
        cartService.fetchCart(cartId: cartId) { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let cart):
                    selectedMotherboardId = cart.motherboard?.id
                    cpuSocket = cart.cpu?.socket
                    loadMotherboards()
                case .failure(let error):
                    print("Fehler beim Laden des Warenkorbs: \(error.localizedDescription)")
                }
            }
        }
    }

    private func addMotherboardToCart(cartId: Int, motherboardId: Int) {
        let urlString = "\(Config.backendBaseURL)/api/shoppingcart/update-cart/\(cartId)/motherboard/\(motherboardId)"
        guard let url = URL(string: urlString) else {
            print("Ungültige URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "PUT"

        URLSession.shared.dataTask(with: request) { _, response, error in
            if let error = error {
                print("Fehler beim Hinzufügen des Mainboards: \(error)")
            } else if let httpResponse = response as? HTTPURLResponse {
                print("Statuscode: \(httpResponse.statusCode)")
                if httpResponse.statusCode == 200 {
                    print("Mainboard erfolgreich zum Warenkorb hinzugefügt.")
                    DispatchQueue.main.async {
                        cartVM.fetchCart()
                    }
                } else {
                    print("Fehler beim Hinzufügen des Mainboards – Statuscode: \(httpResponse.statusCode)")
                }
            }
        }.resume()
    }
    
    private func removeMotherboardFromCart(cartId: Int) {
        let urlString = "\(Config.backendBaseURL)/api/shoppingcart/remove-component/\(cartId)/motherboard"
        guard let url = URL(string: urlString) else {
            print("Ungültige URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"

        URLSession.shared.dataTask(with: request) { _, response, error in
            if let error = error {
                print("Fehler beim Entfernen von Motherboard: \(error)")
            } else if let httpResponse = response as? HTTPURLResponse {
                print("Statuscode: \(httpResponse.statusCode)")
                if httpResponse.statusCode == 200 {
                    print("Motherboard erfolgreich entfernt.")
                    DispatchQueue.main.async {
                        selectedMotherboardId = nil
                        cartVM.fetchCart()
                    }
                } else {
                    print("Fehler beim Entfernen von Motherboard – Statuscode: \(httpResponse.statusCode)")
                }
            }
        }.resume()
    }
}
