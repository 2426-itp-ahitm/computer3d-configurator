//
//  PowerSupplyListView.swift
//  swiftFrontend
//
//  Created by Julian Murach on 16.06.25.
//


import SwiftUI

struct PowerSupplyListView: View {
    @State private var powersupplies: [PowerSupply] = []
    @State private var isLoading = true
    @State private var errorMessage: String?
    @State private var selectedPowerSupplyId: Int?

    private let powerSupplyService = PowerSupplyService()
    
    var body: some View {
        NavigationView {
            content
                .navigationTitle("Netzteile")
        }
        .onAppear {
            loadPowerSupplies()
        }
    }
    
    @ViewBuilder
    private var content: some View {
        if isLoading {
            ProgressView()
        } else if let errorMessage = errorMessage {
            VStack {
                Text("Fehler: \(errorMessage)")
                    .foregroundColor(.red)
                Button("Erneut versuchen") {
                    loadPowerSupplies()
                }
                .padding()
            }
        } else {
            List(powersupplies) { psu in
                HStack {
                    Image(systemName: selectedPowerSupplyId == psu.id ? "checkmark" : "")
                        .foregroundColor(.blue)
                        .frame(width: 20)

                    AsyncImage(url: URL(string: psu.img)) { image in
                        image.resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 80, height: 80)
                    } placeholder: {
                        ProgressView()
                            .frame(width: 80, height: 80)
                    }

                    VStack(alignment: .leading) {
                        Text(psu.name)
                            .font(.headline)
                        Text("\(psu.type) · \(psu.efficiency) · \(psu.wattage)W")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        Text(String(format: "%.2f €", psu.price))
                            .font(.subheadline)
                    }

                    Spacer()
                }
                .padding(.vertical, 8)
                .contentShape(Rectangle())
                .onTapGesture {
                    selectedPowerSupplyId = psu.id
                    addPowerSupplyToCart(cartId: 1, powerSupplyId: psu.id)
                }
            }
        }
    }
    
    private func loadPowerSupplies() {
        isLoading = true
        errorMessage = nil
        
        powerSupplyService.fetchPowerSupplies { result in
            DispatchQueue.main.async {
                isLoading = false
                switch result {
                case .success(let data):
                    self.powersupplies = data
                case .failure(let error):
                    self.errorMessage = error.localizedDescription
                }
            }
        }
    }

    private func addPowerSupplyToCart(cartId: Int, powerSupplyId: Int) {
        let urlString = "\(Config.backendBaseURL)/api/shoppingcart/update-cart/\(cartId)/psu/\(powerSupplyId)"
        guard let url = URL(string: urlString) else {
            print("Ungültige URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "PUT"

        URLSession.shared.dataTask(with: request) { _, response, error in
            if let error = error {
                print("Fehler beim Hinzufügen des Netzteils: \(error)")
            } else if let httpResponse = response as? HTTPURLResponse {
                print("Statuscode: \(httpResponse.statusCode)")
                if httpResponse.statusCode == 200 {
                    print("Netzteil erfolgreich zum Warenkorb hinzugefügt.")
                } else {
                    print("Fehler beim Hinzufügen des Netzteils – Statuscode: \(httpResponse.statusCode)")
                }
            }
        }.resume()
    }
}
