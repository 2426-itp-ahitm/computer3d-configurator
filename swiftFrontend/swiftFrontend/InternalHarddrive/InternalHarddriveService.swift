//
//  InternalHarddriveService.swift
//  swiftFrontend
//
//  Created by Julian Murach on 16.06.25.
//


import Foundation

class InternalHarddriveService {
    func fetchHarddrives(completion: @escaping (Result<[InternalHarddrive], Error>) -> Void) {
        guard let url = URL(string: "\(Config.backendBaseURL)/api/internalharddrive") else {
            completion(.failure(URLError(.badURL)))
            return
        }

        URLSession.shared.dataTask(with: url) { data, response, error in
            if let data = data {
                do {
                    let drives = try JSONDecoder().decode([InternalHarddrive].self, from: data)
                    completion(.success(drives))
                } catch {
                    completion(.failure(error))
                }
            } else if let error = error {
                completion(.failure(error))
            }
        }.resume()
    }
}
