//
//  ShoppingCartViewModel.swift
//  swiftFrontend
//
//  Created by Julian Murach on 16.06.25.
//


import Foundation
import Combine

class ShoppingCartViewModel: ObservableObject {
    @Published var componentCount: Int = 0

    private let cartId = 1
    private let service = ShoppingCartService()

    init() {
        fetchCart()
    }

    func fetchCart() {
        service.fetchCart(cartId: cartId) { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let cart):
                    // Zähle alle nicht-nil Komponenten
                    var count = 0
                    if cart.cpu != nil { count += 1 }
                    if cart.gpu != nil { count += 1 }
                    if cart.ram != nil { count += 1 }
                    if cart.motherboard != nil { count += 1 }
                    if cart.powersupply != nil { count += 1 }
                    if cart.internalHarddrive != nil { count += 1 }
                    if cart.cpuCooler != nil { count += 1 }
                    if cart.cases != nil { count += 1 }

                    self.componentCount = count

                case .failure(let error):
                    print("Fehler beim Laden des Warenkorbs: \(error.localizedDescription)")
                }
            }
        }
    }
}
