//
//  CPURowView.swift
//  swiftFrontend
//
//  Created by Julian Murach on 26.05.25.
//


//
//  CPURowView.swift
//  swiftFrontend
//
//  Created by Julian Murach on 26.05.25.
//

import SwiftUI

struct CPURowView: View {
    let cpu: CPU

    var body: some View {
        HStack {
            AsyncImage(url: URL(string: cpu.img)) { image in
                image.resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 60, height: 60)
            } placeholder: {
                ProgressView()
                    .frame(width: 60, height: 60)
            }

            VStack(alignment: .leading) {
                Text(cpu.name)
                    .font(.headline)

                Text("\(cpu.coreCount)-Kern • \(String(format: "%.2f", cpu.coreClock)) GHz")
                    .font(.subheadline)
                    .foregroundColor(.secondary)

                if let graphics = cpu.graphics, !graphics.isEmpty {
                    Text("iGPU: \(graphics)")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }

                Text(String(format: "%.2f €", cpu.price))
                    .font(.subheadline)
            }
        }
    }
}
