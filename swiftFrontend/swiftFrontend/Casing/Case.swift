import Foundation

struct Case: Identifiable, Codable {
    var id: Int { case_id }
    let case_id: Int
    let name: String
    let price: Double
    let type: String
    let color: String
    let psu: String?
    let side_panel: String
    let external_volume: Double
    let internal_35_bays: Int
    let img: String
}
