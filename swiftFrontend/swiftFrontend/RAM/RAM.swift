import Foundation

struct RAM: Identifiable, Decodable {
    var id: Int { ram_id }
    let ram_id: Int
    let name: String
    let price: Double
    let type: String
    let clockSpeed: Int
    let moduleCount: Int
    let gbPerModule: Int
    let pricePerGb: Int
    let color: String
    let firstWordLatency: Int
    let casLatency: Int
    let img: String

    enum CodingKeys: String, CodingKey {
        case ram_id, name, price, type
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
