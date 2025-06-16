import Foundation

struct CpuCooler: Identifiable, Codable {
    var id: Int { cpu_cooler_id }
    let cpu_cooler_id: Int
    let name: String
    let price: Double
    let min_rpm: Int
    let max_rpm: Int
    let min_noise_level: Double
    let max_noise_level: Double
    let color: String
    let size: Int?
    let img: String

    enum CodingKeys: String, CodingKey {
        case cpu_cooler_id, name, price, min_rpm, max_rpm, min_noise_level, max_noise_level, color, size, img
    }
}
