//
//  PowerSupply.swift
//  swiftFrontend
//
//  Created by Julian Murach on 16.06.25.
//


import Foundation

struct PowerSupply: Identifiable, Codable {
    var id: Int { powersupply_id }
    let powersupply_id: Int
    let name: String
    let price: Double
    let type: String
    let efficiency: String
    let wattage: Int
    let modular: String
    let color: String?
    let img: String

    enum CodingKeys: String, CodingKey {
        case powersupply_id, name, price, type, efficiency, wattage, modular, color, img
    }
}
