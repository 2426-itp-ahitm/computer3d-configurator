//
//  CpuCoolerRowView.swift
//  swiftFrontend
//
//  Created by Julian Murach on 16.06.25.
//


import SwiftUI

struct CpuCoolerRowView: View {
    let cooler: CpuCooler

    var body: some View {
        HStack {
            AsyncImage(url: URL(string: cooler.img)) { image in
                image.resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 60, height: 60)
            } placeholder: {
                ProgressView()
                    .frame(width: 60, height: 60)
            }

            VStack(alignment: .leading) {
                Text(cooler.name)
                    .font(.headline)
                Text("RPM: \(cooler.min_rpm)-\(cooler.max_rpm), Noise: \(cooler.min_noise_level)-\(cooler.max_noise_level) dB")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                Text(String(format: "%.2f €", cooler.price))
                    .font(.subheadline)
            }
        }
    }
}
