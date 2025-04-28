import SwiftUI

struct GPUDetailView: View {
    var gpu: GPU

    var body: some View {
        ScrollView {
            VStack(alignment: .leading) {
                AsyncImage(url: URL(string: gpu.imageUrl)) { image in
                    image.resizable().scaledToFit().frame(width: 200, height: 200)
                } placeholder: {
                    ProgressView()
                }
                Text("Name: \(gpu.name)").font(.title)
                Text("Preis: \(gpu.price, specifier: "%.2f") €").font(.subheadline)
                Text("Chipset: \(gpu.chipset)").font(.subheadline)
                Text("Speichergröße: \(gpu.memory) GB").font(.subheadline)
                Text("Taktfrequenz: \(gpu.coreClock) MHz").font(.subheadline)
                if let boostClock = gpu.boostClock {
                    Text("Boost-Takt: \(boostClock) MHz").font(.subheadline)
                }
                Text("Farbe: \(gpu.color)").font(.subheadline)
                Text("Länge: \(gpu.length) mm").font(.subheadline)
            }
            .padding()
        }
        .navigationTitle(gpu.name)
    }
}

struct GPUDetailView_Previews: PreviewProvider {
    static var previews: some View {
        GPUDetailView(gpu: GPU(id: 1, name: "Gigabyte EAGLE OC Rev 2.0", price: 799.99, chipset: "GeForce RTX 3080 10GB LHR", memory: 10, coreClock: 1440, boostClock: 1755, color: "Black", length: 320, imageUrl: "https://www.gigabyte.com/FileUpload/Global/KeyFeature/1903/innergigabyteimages/kf-img.png"))
    }
}
