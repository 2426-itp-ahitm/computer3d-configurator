import Foundation

class MotherboardService {
    private let url = "http://localhost:8080/api/motherboards"

    func fetchMotherboards(completion: @escaping (Result<[Motherboard], Error>) -> Void) {
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
                let motherboards = try JSONDecoder().decode([Motherboard].self, from: data)
                completion(.success(motherboards))
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }
}
