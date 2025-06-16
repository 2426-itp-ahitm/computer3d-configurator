import Foundation

class MotherboardService {
    
    func fetchMotherboards(completion: @escaping (Result<[Motherboard], Error>) -> Void) {
        guard let url = URL(string: "\(Config.backendBaseURL)/api/motherboards") else {
            completion(.failure(URLError(.badURL)))
            return
        }

        URLSession.shared.dataTask(with: url) { data, response, error in
            if let data = data {
                do {
                    let motherboards = try JSONDecoder().decode([Motherboard].self, from: data)
                    completion(.success(motherboards))
                } catch {
                    completion(.failure(error))
                }
            } else if let error = error {
                completion(.failure(error))
            }
        }.resume()
    }
}
