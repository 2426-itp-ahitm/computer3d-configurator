import SwiftUI

struct CPUListView: View {
    @EnvironmentObject var cartVM: ShoppingCartViewModel
    @State private var cpus: [CPU] = []
    @State private var isLoading = true
    @State private var errorMessage: String?
    @State private var selectedCpuId: Int?
    @State private var motherboardSocket: String?

    private let cpuService = CPUService()
    private let cartService = ShoppingCartService()
    private let cartId = 1

    var body: some View {
        NavigationView {
            content
                .navigationTitle("CPUs")
        }
        .onAppear {
            loadSelectedCPU()
        }
        .onChange(of: cartVM.cart?.motherboard?.socket) { newSocket in
            motherboardSocket = newSocket
            loadCPUs()
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
                    loadCPUs()
                }
                .padding()
            }
        } else {
            List(cpus) { cpu in
                HStack {
                    Image(systemName: selectedCpuId == cpu.id ? "checkmark.circle.fill" : "circle")
                        .foregroundColor(.blue)
                        .frame(width: 20)

                    AsyncImage(url: URL(string: cpu.img)) { image in
                        image.resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 80, height: 80)
                    } placeholder: {
                        ProgressView()
                            .frame(width: 80, height: 80)
                    }

                    VStack(alignment: .leading) {
                        Text(cpu.name)
                            .font(.headline)
                        Text("\(cpu.coreCount) Kerne • \(cpu.coreClock, specifier: "%.2f") GHz")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        Text(String(format: "%.2f €", cpu.price))
                            .font(.subheadline)
                    }
                    Spacer()
                }
                .padding(.vertical, 8)
                .contentShape(Rectangle())
                .onTapGesture {
                    if selectedCpuId == cpu.id {
                        // Bereits ausgewählt → entfernen
                        removeCpuFromCart(cartId: cartId)
                    } else {
                        // Neue Auswahl → hinzufügen
                        selectedCpuId = cpu.id
                        addCpuToCart(cartId: cartId, cpuId: cpu.id)
                    }
                }

            }
        }
    }

    private func loadCPUs() {
        isLoading = true
        errorMessage = nil

        let fetch: () -> Void = {
            cpuService.fetchCPUs { result in
                DispatchQueue.main.async {
                    isLoading = false
                    switch result {
                    case .success(let cpus):
                        self.cpus = cpus
                    case .failure(let error):
                        self.errorMessage = error.localizedDescription
                    }
                }
            }
        }

        if let socket = motherboardSocket {
            cpuService.fetchCPUsBySocket(socket: socket) { result in
                DispatchQueue.main.async {
                    isLoading = false
                    switch result {
                    case .success(let cpus):
                        self.cpus = cpus
                    case .failure(let error):
                        self.errorMessage = error.localizedDescription
                    }
                }
            }
        } else {
            fetch()
        }
    }

    private func loadSelectedCPU() {
        cartService.fetchCart(cartId: cartId) { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let cart):
                    selectedCpuId = cart.cpu?.id
                    motherboardSocket = cart.motherboard?.socket
                    loadCPUs()
                case .failure(let error):
                    print("Fehler beim Laden des Warenkorbs: \(error.localizedDescription)")
                }
            }
        }
    }

    private func addCpuToCart(cartId: Int, cpuId: Int) {
        let urlString = "\(Config.backendBaseURL)/api/shoppingcart/update-cart/\(cartId)/cpu/\(cpuId)"
        guard let url = URL(string: urlString) else {
            print("Ungültige URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "PUT"

        URLSession.shared.dataTask(with: request) { _, response, error in
            if let error = error {
                print("Fehler beim Hinzufügen der CPU: \(error)")
            } else if let httpResponse = response as? HTTPURLResponse {
                print("Statuscode: \(httpResponse.statusCode)")
                if httpResponse.statusCode == 200 {
                    print("CPU erfolgreich zum Warenkorb hinzugefügt.")
                    DispatchQueue.main.async {
                        cartVM.fetchCart()
                    }
                } else {
                    print("Fehler beim Hinzufügen der CPU – Statuscode: \(httpResponse.statusCode)")
                }
            }
        }.resume()
    }

    
    private func removeCpuFromCart(cartId: Int) {
        let urlString = "\(Config.backendBaseURL)/api/shoppingcart/remove-component/\(cartId)/cpu"
        guard let url = URL(string: urlString) else {
            print("Ungültige URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Fehler beim Entfernen der CPU: \(error)")
            } else if let httpResponse = response as? HTTPURLResponse {
                print("Statuscode: \(httpResponse.statusCode)")
                if httpResponse.statusCode == 200 {
                    print("CPU erfolgreich entfernt.")
                    DispatchQueue.main.async {
                        selectedCpuId = nil
                        cartVM.fetchCart()
                    }
                } else {
                    print("Fehler beim Entfernen – Statuscode: \(httpResponse.statusCode)")
                }
            }
        }.resume()
    }

}
