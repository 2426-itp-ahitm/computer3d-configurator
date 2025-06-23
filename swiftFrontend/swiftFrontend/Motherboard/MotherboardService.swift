import Foundation

class MotherboardService {
    func fetchMotherboards(completion: @escaping (Result<[Motherboard], Error>) -> Void) {
        guard let url = URL(string: "\(Config.backendBaseURL)/api/motherboards") else {
            completion(.failure(URLError(.badURL)))
            return
        }

        URLSession.shared.dataTask(with: url) { data, _, error in
            if let error = error {
                completion(.failure(error))
            } else if let data = data {
                do {
                    let motherboards = try JSONDecoder().decode([Motherboard].self, from: data)
                    completion(.success(motherboards))
                } catch {
                    completion(.failure(error))
                }
            }
        }.resume()
    }

    func fetchMotherboardsBySocket(socket: String, completion: @escaping (Result<[Motherboard], Error>) -> Void) {
        guard let url = URL(string: "\(Config.backendBaseURL)/api/motherboards/by-cpu-socket/\(socket)") else {
            completion(.failure(URLError(.badURL)))
            return
        }

        URLSession.shared.dataTask(with: url) { data, _, error in
            if let error = error {
                completion(.failure(error))
            } else if let data = data {
                do {
                    let motherboards = try JSONDecoder().decode([Motherboard].self, from: data)
                    completion(.success(motherboards))
                } catch {
                    completion(.failure(error))
                }
            }
        }.resume()
    }
}
