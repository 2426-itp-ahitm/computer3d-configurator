import Foundation

struct GPU: Identifiable, Codable {
    var id: Int
    var name: String
    var price: Double
    var chipset: String
    var memory: Int
    var coreClock: Double
    var boostClock: Double?
    var color: String
    var length: Int
    var imageUrl: String
    
    enum CodingKeys: String, CodingKey {
        case id = "gpu_id"
        case name
        case price
        case chipset
        case memory
        case coreClock = "core_clock"
        case boostClock = "boost_clock"
        case color
        case length
        case imageUrl = "img"
    }
}
