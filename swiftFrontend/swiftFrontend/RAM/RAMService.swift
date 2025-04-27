import Foundation

class RAMService {
    private let url = "http://localhost:8080/api/rams"

    func fetchRAMs(completion: @escaping (Result<[RAM], Error>) -> Void) {
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
                let rams = try JSONDecoder().decode([RAM].self, from: data)
                completion(.success(rams))
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }
}
