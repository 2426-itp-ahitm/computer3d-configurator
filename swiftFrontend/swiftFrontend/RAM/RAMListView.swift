import SwiftUI

struct RAMListView: View {
    @State private var rams: [RAM] = []
    @State private var isLoading = true
    @State private var errorMessage: String?

    private let ramService = RAMService()
    
    var body: some View {
        NavigationView {
            Group {
                if isLoading {
                    ProgressView()
                } else if let errorMessage = errorMessage {
                    VStack {
                        Text("Fehler: \(errorMessage)")
                            .foregroundColor(.red)
                        Button("Erneut versuchen") {
                            loadRAMs()
                        }
                        .padding()
                    }
                } else {
                    List(rams) { ram in
                        HStack {
                            AsyncImage(url: URL(string: ram.img)) { image in
                                image.resizable()
                                    .aspectRatio(contentMode: .fit)
                                    .frame(width: 80, height: 80)
                            } placeholder: {
                                ProgressView()
                                    .frame(width: 80, height: 80)
                            }

                            VStack(alignment: .leading) {
                                Text(ram.name)
                                    .font(.headline)
                                Text("\(ram.gbPerModule) GB \(ram.type)")
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                                if let price = ram.price {
                                    Text(String(format: "%.2f €", price))
                                        .font(.subheadline)
                                } else {
                                    Text("Preis unbekannt")
                                        .font(.subheadline)
                                        .foregroundColor(.gray)
                                }
                            }
                        }
                        .padding(.vertical, 8)
                    }
                }
            }
            .navigationTitle("RAM Module")
        }
        .onAppear {
            loadRAMs()
        }
    }
    
    private func loadRAMs() {
        isLoading = true
        errorMessage = nil
        
        ramService.fetchRAMs { result in
            DispatchQueue.main.async {
                isLoading = false
                switch result {
                case .success(let rams):
                    self.rams = rams
                case .failure(let error):
                    self.errorMessage = error.localizedDescription
                }
            }
        }
    }
}
