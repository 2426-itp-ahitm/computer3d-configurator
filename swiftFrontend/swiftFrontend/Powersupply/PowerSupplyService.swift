//
//  PowerSupplyService.swift
//  swiftFrontend
//
//  Created by Julian Murach on 16.06.25.
//


import Foundation

class PowerSupplyService {
    
    func fetchPowerSupplies(completion: @escaping (Result<[PowerSupply], Error>) -> Void) {
        guard let url = URL(string: "\(Config.backendBaseURL)/api/powersupply") else {
            completion(.failure(URLError(.badURL)))
            return
        }

        URLSession.shared.dataTask(with: url) { data, response, error in
            if let data = data {
                do {
                    let powersupplies = try JSONDecoder().decode([PowerSupply].self, from: data)
                    completion(.success(powersupplies))
                } catch {
                    completion(.failure(error))
                }
            } else if let error = error {
                completion(.failure(error))
            }
        }.resume()
    }
}
