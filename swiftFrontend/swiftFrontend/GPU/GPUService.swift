import Foundation

class GPUService: ObservableObject {
    @Published var gpus: [GPU] = []

    private let url = "http://localhost:8080/api/gpus" // Hier deine API-URL einfügen

    func fetchGPUs() {
        guard let url = URL(string: url) else { return }

        let task = URLSession.shared.dataTask(with: url) { data, response, error in
            if let data = data {
                do {
                    let decodedGPUs = try JSONDecoder().decode([GPU].self, from: data)
                    DispatchQueue.main.async {
                        self.gpus = decodedGPUs
                    }
                } catch {
                    print("Fehler beim Dekodieren der GPUs: \(error)")
                }
            }
        }
        task.resume()
    }
}
