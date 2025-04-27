import Foundation

struct GPU: Identifiable, Decodable {
    var id: Int { gpu_id }
    let gpu_id: Int
    let name: String
    let price: Double
    let chipset: String
    let memory: Int
    let coreClock: Int
    let boostClock: Int
    let color: String
    let length: Int
    let img: String

    enum CodingKeys: String, CodingKey {
        case gpu_id, name, price, chipset, memory
        case coreClock = "core_clock"
        case boostClock = "boost_clock"
        case color, length, img
    }
}
