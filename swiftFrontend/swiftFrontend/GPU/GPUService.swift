import Foundation

class GPUService {
    private let url = "http://localhost:8080/api/gpus"

    func fetchGPUs(completion: @escaping (Result<[GPU], Error>) -> Void) {
        guard let url = URL(string: url) else {
            completion(.failure(NSError(domain: "Invalid URL", code: 400)))
            return
        }

        URLSession.shared.dataTask(with: url) { data, _, error in
            if let error = error {
                completion(.failure(error))
                return
            }

            guard let data = data else {
                completion(.failure(NSError(domain: "No data", code: 500)))
                return
            }

            do {
                let gpus = try JSONDecoder().decode([GPU].self, from: data)
                completion(.success(gpus))
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }
}
