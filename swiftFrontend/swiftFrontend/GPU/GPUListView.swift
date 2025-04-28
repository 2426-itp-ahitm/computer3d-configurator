import SwiftUI

struct GPUListView: View {
    @StateObject private var gpuService = GPUService()
    @State private var selectedGPU: GPU? = nil // Hier wird die ausgewählte GPU gespeichert

    var body: some View {
        NavigationView {
            List(gpuService.gpus) { gpu in
                NavigationLink(destination: GPUDetailView(gpu: gpu)) {
                    HStack {
                        AsyncImage(url: URL(string: gpu.imageUrl)) { image in
                            image.resizable().scaledToFit().frame(width: 50, height: 50)
                        } placeholder: {
                            ProgressView()
                        }
                        
                        Text(gpu.name)
                        
                        Spacer()

                        // Radio-Button (Picker) neben jeder GPU
                        if selectedGPU?.id == gpu.id {
                            Image(systemName: "circle.fill") // ausgewählt
                                .foregroundColor(.blue)
                                .onTapGesture {
                                    selectedGPU = nil // Deaktiviert die Auswahl, falls der Radio-Button erneut angetippt wird
                                }
                        } else {
                            Image(systemName: "circle")
                                .foregroundColor(.gray)
                                .onTapGesture {
                                    selectedGPU = gpu // Wählt die GPU aus
                                }
                        }
                    }
                }
            }
            .navigationTitle("Grafikkarten")
        }
        .onAppear {
            gpuService.fetchGPUs()
        }
    }
}

struct GPUListView_Previews: PreviewProvider {
    static var previews: some View {
        GPUListView()
    }
}
