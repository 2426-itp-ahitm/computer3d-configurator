import Foundation

struct Motherboard: Identifiable, Decodable {
    var id: Int { motherboard_id }
    let motherboard_id: Int
    let name: String
    let price: Double
    let socket: String
    let ramType: String
    let formFactor: String
    let maxMemory: Int
    let memorySlots: Int
    let color: String
    let img: String

    enum CodingKeys: String, CodingKey {
        case motherboard_id, name, price, socket, ramType
        case formFactor = "form_factor"
        case maxMemory = "max_memory"
        case memorySlots = "memory_slots"
        case color, img
    }
}
