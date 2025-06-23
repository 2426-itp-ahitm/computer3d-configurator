import SwiftUI

struct CpuCoolerListView: View {
    @EnvironmentObject var cartVM: ShoppingCartViewModel
    @State private var coolers: [CpuCooler] = []
    @State private var isLoading = true
    @State private var errorMessage: String?
    @State private var selectedCoolerId: Int?

    private let cpuCoolerService = CpuCoolerService()
    private let cartService = ShoppingCartService()
    private let cartId = 1

    var body: some View {
        NavigationView {
            content
                .navigationTitle("CPU-Kühler")
        }
        .onAppear {
            loadCoolers()
            loadSelectedCooler()
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
                    loadCoolers()
                    loadSelectedCooler()
                }
                .padding()
            }
        } else {
            List(coolers) { cooler in
                HStack {
                    Image(systemName: selectedCoolerId == cooler.id ? "checkmark.circle.fill" : "circle")
                        .foregroundColor(.blue)
                        .frame(width: 20)

                    AsyncImage(url: URL(string: cooler.img)) { image in
                        image.resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 80, height: 80)
                    } placeholder: {
                        ProgressView()
                            .frame(width: 80, height: 80)
                    }

                    VStack(alignment: .leading) {
                        Text(cooler.name)
                            .font(.headline)
                        Text("RPM: \(cooler.min_rpm)-\(cooler.max_rpm), Noise: \(cooler.min_noise_level)-\(cooler.max_noise_level) dB")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        Text(String(format: "%.2f €", cooler.price))
                            .font(.subheadline)
                    }

                    Spacer()
                }
                .padding(.vertical, 8)
                .contentShape(Rectangle())
                .onTapGesture {
                    if selectedCoolerId == cooler.id {
                        removeCoolerFromCart(cartId: cartId)
                    } else {
                        selectedCoolerId = cooler.id
                        addCoolerToCart(cartId: cartId, coolerId: cooler.id)
                    }
                }
            }
        }
    }

    private func loadCoolers() {
        isLoading = true
        errorMessage = nil

        cpuCoolerService.fetchCpuCoolers { result in
            DispatchQueue.main.async {
                isLoading = false
                switch result {
                case .success(let data):
                    self.coolers = data
                case .failure(let error):
                    self.errorMessage = error.localizedDescription
                }
            }
        }
    }

    private func loadSelectedCooler() {
        cartService.fetchCart(cartId: cartId) { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let cart):
                    selectedCoolerId = cart.cpuCooler?.id
                case .failure(let error):
                    print("Fehler beim Laden des Warenkorbs: \(error.localizedDescription)")
                }
            }
        }
    }

    private func addCoolerToCart(cartId: Int, coolerId: Int) {
        let urlString = "\(Config.backendBaseURL)/api/shoppingcart/update-cart/\(cartId)/cpucooler/\(coolerId)"
        guard let url = URL(string: urlString) else {
            print("Ungültige URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "PUT"

        URLSession.shared.dataTask(with: request) { _, response, error in
            if let error = error {
                print("Fehler beim Hinzufügen des Kühlers: \(error)")
            } else if let httpResponse = response as? HTTPURLResponse {
                print("Statuscode: \(httpResponse.statusCode)")
                if httpResponse.statusCode == 200 {
                    print("CPU-Kühler erfolgreich zum Warenkorb hinzugefügt.")
                    DispatchQueue.main.async {
                        cartVM.fetchCart()
                    }
                } else {
                    print("Fehler beim Hinzufügen – Statuscode: \(httpResponse.statusCode)")
                }
            }
        }.resume()
    }

    private func removeCoolerFromCart(cartId: Int) {
        let urlString = "\(Config.backendBaseURL)/api/shoppingcart/remove-component/\(cartId)/cpucooler"
        guard let url = URL(string: urlString) else {
            print("Ungültige URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"

        URLSession.shared.dataTask(with: request) { _, response, error in
            if let error = error {
                print("Fehler beim Entfernen des Kühlers: \(error)")
            } else if let httpResponse = response as? HTTPURLResponse {
                print("Statuscode: \(httpResponse.statusCode)")
                if httpResponse.statusCode == 200 {
                    print("CPU-Kühler erfolgreich entfernt.")
                    DispatchQueue.main.async {
                        selectedCoolerId = nil
                        cartVM.fetchCart()
                    }
                } else {
                    print("Fehler beim Entfernen – Statuscode: \(httpResponse.statusCode)")
                }
            }
        }.resume()
    }
}
