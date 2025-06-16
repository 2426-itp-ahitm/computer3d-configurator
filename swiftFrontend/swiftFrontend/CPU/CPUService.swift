import Foundation

class CPUService {
    func fetchCPUs(completion: @escaping (Result<[CPU], Error>) -> Void) {
        guard let url = URL(string: "\(Config.backendBaseURL)/api/cpus") else {
            completion(.failure(URLError(.badURL)))
            return
        }

        URLSession.shared.dataTask(with: url) { data, _, error in
            if let error = error {
                completion(.failure(error))
            } else if let data = data {
                do {
                    let cpus = try JSONDecoder().decode([CPU].self, from: data)
                    completion(.success(cpus))
                } catch {
                    completion(.failure(error))
                }
            }
        }.resume()
    }
}
