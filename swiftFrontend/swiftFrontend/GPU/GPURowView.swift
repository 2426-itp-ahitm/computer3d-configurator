//
//  GPURowView.swift
//  swiftFrontend
//
//  Created by Julian Murach on 26.05.25.
//


import SwiftUI

struct GPURowView: View {
    let gpu: GPU

    var body: some View {
        HStack {
            AsyncImage(url: URL(string: gpu.imageUrl)) { image in
                image.resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 60, height: 60)
            } placeholder: {
                ProgressView()
                    .frame(width: 60, height: 60)
            }

            VStack(alignment: .leading) {
                Text(gpu.name)
                    .font(.headline)
                Text("\(gpu.memory) GB · \(gpu.chipset)")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                Text(String(format: "%.2f €", gpu.price))
                    .font(.subheadline)
            }
        }
    }
}
