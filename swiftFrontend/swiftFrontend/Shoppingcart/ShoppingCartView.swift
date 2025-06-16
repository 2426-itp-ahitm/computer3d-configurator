import SwiftUI

struct ShoppingCartView: View {
    @State private var cart: ShoppingCart?
    @State private var isLoading = true
    @State private var errorMessage: String?

    private let service = ShoppingCartService()
    private let cartId = 1

    // Dein 3D-Link
    private let view3DURL = URL(string: "https://view.vuforia.com/command/view-experience?url=https%3A%2F%2Fexpsrv-c3dconf-leo.cloud.arge3d.at%2FExperienceService%2Fcontent%2Fprojects%2Fpc3dconfigurator%2Findex.html%3FexpId%3D1")!

    var body: some View {
        NavigationView {
            Group {
                if isLoading {
                    ProgressView("Warenkorb wird geladen...")
                } else if let errorMessage = errorMessage {
                    VStack {
                        Text("Fehler: \(errorMessage)")
                            .foregroundColor(.red)
                        Button("Erneut laden") {
                            loadCart()
                        }
                        .padding()
                    }
                } else if let cart = cart {
                    VStack {
                        List {
                            if let cpu = cart.cpu {
                                Section(header: Text("CPU")) {
                                    CPURowView(cpu: cpu)
                                }
                            }
                            if let motherboard = cart.motherboard {
                                Section(header: Text("Motherboard")) {
                                    MotherboardRowView(motherboard: motherboard)
                                }
                            }
                            if let gpu = cart.gpu {
                                Section(header: Text("GPU")) {
                                    GPURowView(gpu: gpu)
                                }
                            }
                            if let ram = cart.ram {
                                Section(header: Text("RAM")) {
                                    RAMRowView(ram: ram)
                                }
                            }
                            if let internalHarddrive = cart.internalHarddrive {
                                Section(header: Text("Internal Harddrive")) {
                                    InternalHarddriveRowView(drive: internalHarddrive)
                                }
                            }
                            if let cpuCooler = cart.cpuCooler {
                                Section(header: Text("CPU Cooler")) {
                                    CpuCoolerRowView(cooler: cpuCooler)
                                }
                            }
                            if let powersupply = cart.powersupply {
                                Section(header: Text("Powersupply")) {
                                    PowerSupplyRowView(powersupply: powersupply)
                                }
                            }
                            if let casing = cart.cases {
                                Section(header: Text("Case")) {
                                    CaseRowView(caseModel: casing)
                                }
                            }
                        }

                        // 3D-View Button
                        Button(action: {
                            UIApplication.shared.open(view3DURL)
                        }) {
                            HStack {
                                Image(systemName: "cube.transparent")
                                Text("3D-Ansicht öffnen")
                            }
                            .padding()
                            .frame(maxWidth: .infinity)
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(10)
                        }
                        .padding()
                    }
                } else {
                    Text("Warenkorb ist leer.")
                        .foregroundColor(.gray)
                }
            }
            .navigationTitle("Warenkorb")
        }
        .onAppear {
            loadCart()
        }
    }

    private func loadCart() {
        isLoading = true
        errorMessage = nil

        service.fetchCart(cartId: cartId) { result in
            DispatchQueue.main.async {
                isLoading = false
                switch result {
                case .success(let cart):
                    self.cart = cart
                case .failure(let error):
                    self.errorMessage = error.localizedDescription
                }
            }
        }
    }
}
