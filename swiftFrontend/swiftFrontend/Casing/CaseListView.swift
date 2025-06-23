import SwiftUI

struct CaseListView: View {
    @EnvironmentObject var cartVM: ShoppingCartViewModel
    @State private var cases: [Case] = []
    @State private var isLoading = true
    @State private var errorMessage: String?
    @State private var selectedCaseId: Int?

    private let caseService = CaseService()
    private let cartService = ShoppingCartService()
    private let cartId = 1

    var body: some View {
        NavigationView {
            content
                .navigationTitle("Gehäuse")
        }
        .onAppear {
            loadCases()
            loadSelectedCase()
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
                    loadCases()
                    loadSelectedCase()
                }
                .padding()
            }
        } else {
            List(cases) { caseModel in
                HStack {
                    Image(systemName: selectedCaseId == caseModel.id ? "checkmark.circle.fill" : "circle")
                        .foregroundColor(.blue)
                        .frame(width: 20)

                    AsyncImage(url: URL(string: caseModel.img)) { image in
                        image.resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 80, height: 80)
                    } placeholder: {
                        ProgressView()
                            .frame(width: 80, height: 80)
                    }

                    VStack(alignment: .leading) {
                        Text(caseModel.name)
                            .font(.headline)
                        Text("\(caseModel.side_panel), \(caseModel.external_volume)L, \(caseModel.internal_35_bays)x 3.5\" Bays")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        Text(String(format: "%.2f €", caseModel.price))
                            .font(.subheadline)
                    }

                    Spacer()
                }
                .padding(.vertical, 8)
                .contentShape(Rectangle())
                .onTapGesture {
                    if selectedCaseId == caseModel.id {
                        removeCaseFromCart(cartId: cartId)
                    } else {
                        selectedCaseId = caseModel.id
                        addCaseToCart(cartId: cartId, caseId: caseModel.id)
                    }
                }
            }
        }
    }

    private func loadCases() {
        isLoading = true
        errorMessage = nil

        caseService.fetchCases { result in
            DispatchQueue.main.async {
                isLoading = false
                switch result {
                case .success(let data):
                    self.cases = data
                case .failure(let error):
                    self.errorMessage = error.localizedDescription
                }
            }
        }
    }

    private func loadSelectedCase() {
        cartService.fetchCart(cartId: cartId) { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let cart):
                    selectedCaseId = cart.cases?.id
                case .failure(let error):
                    print("Fehler beim Laden des Warenkorbs: \(error.localizedDescription)")
                }
            }
        }
    }

    private func addCaseToCart(cartId: Int, caseId: Int) {
        let urlString = "\(Config.backendBaseURL)/api/shoppingcart/update-cart/\(cartId)/case/\(caseId)"
        guard let url = URL(string: urlString) else {
            print("Ungültige URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "PUT"

        URLSession.shared.dataTask(with: request) { _, response, error in
            if let error = error {
                print("Fehler beim Hinzufügen des Gehäuses: \(error)")
            } else if let httpResponse = response as? HTTPURLResponse {
                print("Statuscode: \(httpResponse.statusCode)")
                if httpResponse.statusCode == 200 {
                    print("Gehäuse erfolgreich zum Warenkorb hinzugefügt.")
                    DispatchQueue.main.async {
                        cartVM.fetchCart()
                    }
                } else {
                    print("Fehler beim Hinzufügen – Statuscode: \(httpResponse.statusCode)")
                }
            }
        }.resume()
    }

    private func removeCaseFromCart(cartId: Int) {
        let urlString = "\(Config.backendBaseURL)/api/shoppingcart/remove-component/\(cartId)/case"
        guard let url = URL(string: urlString) else {
            print("Ungültige URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"

        URLSession.shared.dataTask(with: request) { _, response, error in
            if let error = error {
                print("Fehler beim Entfernen des Gehäuses: \(error)")
            } else if let httpResponse = response as? HTTPURLResponse {
                print("Statuscode: \(httpResponse.statusCode)")
                if httpResponse.statusCode == 200 {
                    print("Gehäuse erfolgreich entfernt.")
                    DispatchQueue.main.async {
                        selectedCaseId = nil
                        cartVM.fetchCart()
                    }
                } else {
                    print("Fehler beim Entfernen – Statuscode: \(httpResponse.statusCode)")
                }
            }
        }.resume()
    }
}
