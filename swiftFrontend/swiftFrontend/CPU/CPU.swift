import Foundation

struct CPU: Identifiable, Codable {
    var id: Int
    var name: String
    var price: Double
    var coreCount: Int
    var coreClock: Double
    var boostClock: Double
    var tdp: Int
    var graphics: String?
    var smt: Bool
    var socket: String
    var img: String

    enum CodingKeys: String, CodingKey {
        case id = "cpu_id"
        case name
        case price
        case coreCount = "core_count"
        case coreClock = "core_clock"
        case boostClock = "boost_clock"
        case tdp
        case graphics
        case smt
        case socket
        case img
    }
}
