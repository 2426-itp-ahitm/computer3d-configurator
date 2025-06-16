struct ShoppingCart: Codable {
    let id: Int
    let cpu: CPU?
    let motherboard: Motherboard?
    let gpu: GPU?
    let ram: RAM?
    let cases: Case?
    let cpuCooler: CpuCooler?
    let internalHarddrive: InternalHarddrive?
    let powersupply: PowerSupply?
    let totalPrice: Double?
    let createdAt: String?
    let updatedAt: String?
}
