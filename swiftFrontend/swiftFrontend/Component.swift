import SwiftUI

enum Component: String, CaseIterable {
    case cpu = "CPU"
    case gpu = "GPU"
    case ram = "RAM"
    case motherboard = "Motherboard"
    case internalHarddrive = "Internal Harddrive"
    case powerSupply = "Power Supply"
    case cpuCooler = "CPU Cooler"
    case casing = "Casing"
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
        case .internalHarddrive:
            return AnyView(InternalHarddriveListView())
        case .powerSupply:
            return AnyView(PowerSupplyListView())
        case .cpuCooler:
            return AnyView(CpuCoolerListView())
        case .casing:
            return AnyView(CaseListView())
        }
    }

    var systemImage: String {
        switch self {
        case .cpu: return "cpu"
        case .gpu: return "display"
        case .ram: return "memorychip"
        case .motherboard: return "rectangle.stack"
        case .internalHarddrive: return "internaldrive"
        case .powerSupply: return "bolt.fill"
        case .cpuCooler: return "fanblades.fill"
        case .casing: return "xserve"
        }
    }
}
