//
//  MotherboardRowView.swift
//  swiftFrontend
//
//  Created by Julian Murach on 26.05.25.
//


import SwiftUI

struct MotherboardRowView: View {
    let motherboard: Motherboard

    var body: some View {
        HStack {
            AsyncImage(url: URL(string: motherboard.img)) { image in
                image.resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 60, height: 60)
            } placeholder: {
                ProgressView()
                    .frame(width: 60, height: 60)
            }

            VStack(alignment: .leading) {
                Text(motherboard.name)
                    .font(.headline)
                Text("\(motherboard.socket) · \(motherboard.ramType) · \(motherboard.formFactor)")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                Text(String(format: "%.2f €", motherboard.price))
                    .font(.subheadline)
            }
        }
    }
}
