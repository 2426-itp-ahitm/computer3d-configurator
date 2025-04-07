import SwiftUI

struct CPUListView: View {
    @State private var cpus: [CPU] = []
    @State private var isLoading = false
    @State private var errorMessage: String?

    private let cpuService = CPUService()

    // Lade die CPUs aus der API
    func loadCPUs() {
        isLoading = true
        errorMessage = nil

        cpuService.fetchCPUs { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let loadedCPUs):
                    self.cpus = loadedCPUs
                case .failure(let error):
                    self.errorMessage = "Fehler: \(error.localizedDescription)"
                }
                self.isLoading = false
            }
        }
    }

    var body: some View {
        NavigationView {
            VStack {
                if isLoading {
                    ProgressView("Lade CPUs...")
                        .progressViewStyle(CircularProgressViewStyle())
                } else if let errorMessage = errorMessage {
                    Text(errorMessage)
                        .foregroundColor(.red)
                } else {
                    List(cpus) { cpu in
                        HStack {
                            AsyncImage(url: URL(string: cpu.img)) { image in
                                image.resizable()
                                     .scaledToFit()
                                     .frame(width: 50, height: 50)
                            } placeholder: {
                                ProgressView()
                            }

                            VStack(alignment: .leading) {
                                Text(cpu.name)
                                    .font(.headline)
                                Text("Preis: €\(cpu.price, specifier: "%.2f")")
                                    .font(.subheadline)
                            }
                        }
                    }
                }
            }
            .onAppear {
                loadCPUs()
            }
            .navigationTitle("CPUs")
        }
    }
}
