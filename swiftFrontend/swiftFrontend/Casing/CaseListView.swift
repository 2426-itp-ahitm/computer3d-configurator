//
//  CaseListView.swift
//  swiftFrontend
//
//  Created by Julian Murach on 16.06.25.
//


import SwiftUI

struct CaseListView: View {
    @State private var cases: [Case] = []
    @State private var isLoading = true
    @State private var errorMessage: String?
    @State private var selectedCaseId: Int?

    private let caseService = CaseService()

    var body: some View {
        NavigationView {
            content
                .navigationTitle("Gehäuse")
        }
        .onAppear {
            loadCases()
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
                }
                .padding()
            }
        } else {
            List(cases) { caseModel in
                HStack {
                    Image(systemName: selectedCaseId == caseModel.id ? "checkmark" : "")
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
                    selectedCaseId = caseModel.id
                    addCaseToCart(cartId: 1, caseId: caseModel.id)
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
                } else {
                    print("Fehler beim Hinzufügen – Statuscode: \(httpResponse.statusCode)")
                }
            }
        }.resume()
    }
}
