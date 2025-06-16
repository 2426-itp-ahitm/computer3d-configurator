//
//  CaseService.swift
//  swiftFrontend
//
//  Created by Julian Murach on 16.06.25.
//


import Foundation

class CaseService {
    
    func fetchCases(completion: @escaping (Result<[Case], Error>) -> Void) {
        guard let url = URL(string: "\(Config.backendBaseURL)/api/cases") else {
            completion(.failure(URLError(.badURL)))
            return
        }

        URLSession.shared.dataTask(with: url) { data, _, error in
            if let data = data {
                do {
                    let cases = try JSONDecoder().decode([Case].self, from: data)
                    completion(.success(cases))
                } catch {
                    completion(.failure(error))
                }
            } else if let error = error {
                completion(.failure(error))
            }
        }.resume()
    }
}
