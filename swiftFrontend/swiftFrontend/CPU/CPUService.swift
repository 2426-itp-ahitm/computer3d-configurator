import Foundation

class CPUService {
    private let url = "http://localhost:8080/api/cpus"

    func fetchCPUs(completion: @escaping (Result<[CPU], Error>) -> Void) {
        guard let url = URL(string: url) else {
            completion(.failure(NSError(domain: "Invalid URL", code: 400, userInfo: nil)))
            return
        }

        URLSession.shared.dataTask(with: url) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }

            guard let data = data else {
                completion(.failure(NSError(domain: "No data received", code: 500, userInfo: nil)))
                return
            }

            do {
                let cpus = try JSONDecoder().decode([CPU].self, from: data)
                completion(.success(cpus))
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }
}
