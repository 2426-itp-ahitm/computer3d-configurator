//
//  CpuCoolerService.swift
//  swiftFrontend
//
//  Created by Julian Murach on 16.06.25.
//


import Foundation

class CpuCoolerService {
    
    func fetchCpuCoolers(completion: @escaping (Result<[CpuCooler], Error>) -> Void) {
        guard let url = URL(string: "\(Config.backendBaseURL)/api/cpu-cooler") else {
            completion(.failure(URLError(.badURL)))
            return
        }

        URLSession.shared.dataTask(with: url) { data, _, error in
            if let data = data {
                do {
                    let coolers = try JSONDecoder().decode([CpuCooler].self, from: data)
                    completion(.success(coolers))
                } catch {
                    completion(.failure(error))
                }
            } else if let error = error {
                completion(.failure(error))
            }
        }.resume()
    }
}
