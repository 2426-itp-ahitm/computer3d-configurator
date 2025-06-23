import Foundation

class ShoppingCartViewModel: ObservableObject {
    @Published var cart: ShoppingCart? {
        didSet {
            updateComponentCount()
        }
    }

    @Published var componentCount: Int = 0

    func fetchCart() {
        let cartId = 1
        ShoppingCartService().fetchCart(cartId: cartId) { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let cart):
                    self.cart = cart
                case .failure(let error):
                    print("Fehler beim Laden des Warenkorbs: \(error)")
                }
            }
        }
    }

    private func updateComponentCount() {
        guard let cart = cart else {
            componentCount = 0
            return
        }

        var count = 0
        if cart.cpu != nil { count += 1 }
        if cart.gpu != nil { count += 1 }
        if cart.ram != nil { count += 1 }
        if cart.motherboard != nil { count += 1 }
        if cart.powersupply != nil { count += 1 }
        if cart.internalHarddrive != nil { count += 1 }
        if cart.cpuCooler != nil { count += 1 }
        if cart.cases != nil { count += 1 }
        componentCount = count
    }
}
