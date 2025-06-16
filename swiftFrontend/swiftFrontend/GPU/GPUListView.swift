import SwiftUI

struct GPUListView: View {
    @State private var gpus: [GPU] = []
    @State private var isLoading = true
    @State private var errorMessage: String?
    @State private var selectedGpuId: Int?

    private let gpuService = GPUService()
    private let cartService = ShoppingCartService()
    private let cartId = 1

    var body: some View {
        NavigationView {
            content
                .navigationTitle("Grafikkarten")
        }
        .onAppear {
            loadGPUs()
            loadSelectedGPU()
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
                    loadGPUs()
                    loadSelectedGPU()
                }
                .padding()
            }
        } else {
            List(gpus) { gpu in
                HStack {
                    Image(systemName: selectedGpuId == gpu.id ? "checkmark.circle.fill" : "circle")
                        .foregroundColor(.blue)
                        .frame(width: 20)

                    AsyncImage(url: URL(string: gpu.imageUrl)) { image in
                        image.resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 80, height: 80)
                    } placeholder: {
                        ProgressView()
                            .frame(width: 80, height: 80)
                    }

                    VStack(alignment: .leading) {
                        Text(gpu.name)
                            .font(.headline)
                        Text("\(gpu.memory) GB · \(gpu.chipset)")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        Text(String(format: "%.2f €", gpu.price))
                            .font(.subheadline)
                    }
                    Spacer()
                }
                .padding(.vertical, 8)
                .contentShape(Rectangle())
                .onTapGesture {
                    if selectedGpuId == gpu.id {
                        // Bereits ausgewählt → entfernen
                        removeGpuFromCart(cartId: cartId)
                    } else {
                        // Neue Auswahl → hinzufügen
                        selectedGpuId = gpu.id
                        addGpuToCart(cartId: cartId, gpuId: gpu.id)
                    }
                }

            }
        }
    }

    private func loadGPUs() {
        isLoading = true
        errorMessage = nil

        gpuService.fetchGPUs { result in
            DispatchQueue.main.async {
                isLoading = false
                switch result {
                case .success(let gpus):
                    self.gpus = gpus
                case .failure(let error):
                    self.errorMessage = error.localizedDescription
                }
            }
        }
    }

    private func loadSelectedGPU() {
        cartService.fetchCart(cartId: cartId) { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let cart):
                    selectedGpuId = cart.gpu?.id
                case .failure(let error):
                    print("Fehler beim Laden des Warenkorbs: \(error.localizedDescription)")
                }
            }
        }
    }

    private func addGpuToCart(cartId: Int, gpuId: Int) {
        let urlString = "\(Config.backendBaseURL)/api/shoppingcart/update-cart/\(cartId)/gpu/\(gpuId)"
        guard let url = URL(string: urlString) else {
            print("Ungültige URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "PUT"

        URLSession.shared.dataTask(with: request) { _, response, error in
            if let error = error {
                print("Fehler beim Hinzufügen der GPU: \(error)")
            } else if let httpResponse = response as? HTTPURLResponse {
                print("Statuscode: \(httpResponse.statusCode)")
                if httpResponse.statusCode == 200 {
                    print("GPU erfolgreich zum Warenkorb hinzugefügt.")
                } else {
                    print("Fehler beim Hinzufügen der GPU – Statuscode: \(httpResponse.statusCode)")
                }
            }
        }.resume()
    }
    
    private func removeGpuFromCart(cartId: Int) {
        let urlString = "\(Config.backendBaseURL)/api/shoppingcart/remove-component/\(cartId)/gpu"
        guard let url = URL(string: urlString) else {
            print("Ungültige URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Fehler beim Entfernen der GPU: \(error)")
            } else if let httpResponse = response as? HTTPURLResponse {
                print("Statuscode: \(httpResponse.statusCode)")
                if httpResponse.statusCode == 200 {
                    print("GPU erfolgreich entfernt.")
                    DispatchQueue.main.async {
                        selectedGpuId = nil
                    }
                } else {
                    print("Fehler beim Entfernen – Statuscode: \(httpResponse.statusCode)")
                }
            }
        }.resume()
    }
}
