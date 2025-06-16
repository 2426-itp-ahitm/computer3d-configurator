import Foundation

struct InternalHarddrive: Identifiable, Codable {
    var id: Int { internalHarddrive_id }
    let internalHarddrive_id: Int
    let name: String
    let price: Double
    let capacity: Int
    let pricePerGb: Double
    let type: String
    let cache: Int?
    let formFactor: String
    let memoryInterface: String
    let image: String

    enum CodingKeys: String, CodingKey {
        case internalHarddrive_id, name, price, capacity, pricePerGb, type, cache
        case formFactor = "formFactor"
        case memoryInterface = "memoryInterface"
        case image
    }
}

