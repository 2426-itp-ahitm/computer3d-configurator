import SwiftUI

enum Component: String, CaseIterable {
    case cpu = "CPU"
    case gpu = "GPU"
    case ram = "RAM"
    case motherboard = "Motherboard"
    // → Hier kannst du einfach erweitern: ssd, mainboard, etc.

    var destinationView: some View {
        switch self {
        case .cpu:
            return AnyView(CPUListView())
        case .gpu:
            return AnyView(GPUListView())
        case .ram:
            return AnyView(RAMListView())
        case .motherboard:
            return AnyView(MotherboardListView())
        }
    }

    var systemImage: String {
        switch self {
        case .cpu: return "cpu"
        case .gpu: return "gpu"
        case .ram: return "memorychip"
        case .motherboard: return "motherboard"
        }
    }
}
