import Foundation

struct RAM: Codable, Identifiable {
    let id: Int
    let name: String
    let price: Double?
    let type: String
    let clockSpeed: Int
    let moduleCount: Int
    let gbPerModule: Int
    let pricePerGb: Double?
    let color: String?
    let firstWordLatency: Int
    let casLatency: Int
    let img: String

    enum CodingKeys: String, CodingKey {
        case id = "ram_id"
        case name
        case price
        case type
        case clockSpeed = "clock_speed"
        case moduleCount = "module_count"
        case gbPerModule = "gb_per_module"
        case pricePerGb = "price_per_gb"
        case color
        case firstWordLatency = "first_word_latency"
        case casLatency = "cas_latency"
        case img
    }
}
