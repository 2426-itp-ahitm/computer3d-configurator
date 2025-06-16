//
//  InternalHarddriveListView.swift
//  swiftFrontend
//
//  Created by Julian Murach on 16.06.25.
//


import SwiftUI

struct InternalHarddriveListView: View {
    @State private var harddrives: [InternalHarddrive] = []
    @State private var isLoading = true
    @State private var errorMessage: String?
    @State private var selectedDriveId: Int?

    private let driveService = InternalHarddriveService()
    
    var body: some View {
        NavigationView {
            content
                .navigationTitle("Festplatten")
        }
        .onAppear {
            loadDrives()
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
                    loadDrives()
                }
                .padding()
            }
        } else {
            List(harddrives) { drive in
                HStack {
                    Image(systemName: selectedDriveId == drive.id ? "checkmark" : "")
                        .foregroundColor(.blue)
                        .frame(width: 20)

                    AsyncImage(url: URL(string: drive.image)) { image in
                        image.resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 80, height: 80)
                    } placeholder: {
                        ProgressView()
                            .frame(width: 80, height: 80)
                    }

                    VStack(alignment: .leading) {
                        Text(drive.name)
                            .font(.headline)
                        Text("\(drive.capacity) GB \(drive.type) · \(drive.formFactor)")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        Text(String(format: "%.2f €", drive.price))
                            .font(.subheadline)
                    }
                    Spacer()
                }
                .padding(.vertical, 8)
                .contentShape(Rectangle())
                .onTapGesture {
                    selectedDriveId = drive.id
                    addDriveToCart(cartId: 1, driveId: drive.id)
                }
            }
        }
    }

    private func loadDrives() {
        isLoading = true
        errorMessage = nil

        driveService.fetchHarddrives { result in
            DispatchQueue.main.async {
                isLoading = false
                switch result {
                case .success(let drives):
                    self.harddrives = drives
                case .failure(let error):
                    self.errorMessage = error.localizedDescription
                }
            }
        }
    }

    private func addDriveToCart(cartId: Int, driveId: Int) {
        let urlString = "\(Config.backendBaseURL)/api/shoppingcart/update-cart/\(cartId)/internalharddrive/\(driveId)"
        guard let url = URL(string: urlString) else {
            print("Ungültige URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "PUT"

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Fehler beim Hinzufügen der Festplatte: \(error)")
            } else if let httpResponse = response as? HTTPURLResponse {
                print("Statuscode: \(httpResponse.statusCode)")
                if httpResponse.statusCode == 200 {
                    print("Festplatte erfolgreich zum Warenkorb hinzugefügt.")
                } else {
                    print("Fehler beim Hinzufügen – Statuscode: \(httpResponse.statusCode)")
                }
            }
        }.resume()
    }
}
