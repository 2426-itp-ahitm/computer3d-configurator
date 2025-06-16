import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            CPUListView()
                .tabItem {
                    Label("CPUs", systemImage: "cpu")
                }
            
            MotherboardListView()
                .tabItem {
                    Label("Motherboards", systemImage: "memorychip")
                }
            
            GPUListView()
                .tabItem {
                    Label("GPUs", systemImage: "display")
                }
            
            RAMListView()
                .tabItem {
                    Label("RAM", systemImage: "rectangle.stack")
                }
            InternalHarddriveListView()
                .tabItem {
                    Label("Storage", systemImage: "folder")
                }
        }
    }
}
