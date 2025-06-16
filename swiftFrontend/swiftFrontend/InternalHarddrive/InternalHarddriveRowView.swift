//
//  InternalHarddriveRowView.swift
//  swiftFrontend
//
//  Created by Julian Murach on 16.06.25.
//


import SwiftUI

struct InternalHarddriveRowView: View {
    let drive: InternalHarddrive

    var body: some View {
        HStack {
            AsyncImage(url: URL(string: drive.image)) { image in
                image.resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 60, height: 60)
            } placeholder: {
                ProgressView()
                    .frame(width: 60, height: 60)
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
        }
    }
}
