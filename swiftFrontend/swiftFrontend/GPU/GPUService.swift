import Foundation

class GPUService {
    
    func fetchGPUs(completion: @escaping (Result<[GPU], Error>) -> Void) {
        guard let url = URL(string: "\(Config.backendBaseURL)/api/gpus") else {
            completion(.failure(URLError(.badURL)))
            return
        }

        URLSession.shared.dataTask(with: url) { data, response, error in
            if let data = data {
                do {
                    let gpus = try JSONDecoder().decode([GPU].self, from: data)
                    completion(.success(gpus))
                } catch {
                    completion(.failure(error))
                }
            } else if let error = error {
                completion(.failure(error))
            }
        }.resume()
    }
}
