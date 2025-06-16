//
//  RAMRowView.swift
//  swiftFrontend
//
//  Created by Julian Murach on 19.05.25.
//

import SwiftUI;


struct RAMRowView: View {
    let ram: RAM

    var body: some View {
        HStack {
            AsyncImage(url: URL(string: ram.img)) { image in
                image.resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 60, height: 60)
            } placeholder: {
                ProgressView()
                    .frame(width: 60, height: 60)
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
                }
            }
        }
    }
}
