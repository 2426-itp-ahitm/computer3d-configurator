import Foundation

class RAMService {
    
    func fetchRAMs(completion: @escaping (Result<[RAM], Error>) -> Void) {
        guard let url = URL(string: "http://localhost:8080/api/rams") else {
            completion(.failure(URLError(.badURL)))
            return
        }

        URLSession.shared.dataTask(with: url) { data, response, error in
            if let data = data {
                do {
                    let rams = try JSONDecoder().decode([RAM].self, from: data)
                    completion(.success(rams))
                } catch {
                    completion(.failure(error))
                }
            } else if let error = error {
                completion(.failure(error))
            }
        }.resume()
    }
}
