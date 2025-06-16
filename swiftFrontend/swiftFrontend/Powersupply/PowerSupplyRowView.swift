//
//  PowerSupplyRowView.swift
//  swiftFrontend
//
//  Created by Julian Murach on 16.06.25.
//


import SwiftUI

struct PowerSupplyRowView: View {
    let powersupply: PowerSupply

    var body: some View {
        HStack {
            AsyncImage(url: URL(string: powersupply.img)) { image in
                image.resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 60, height: 60)
            } placeholder: {
                ProgressView()
                    .frame(width: 60, height: 60)
            }

            VStack(alignment: .leading) {
                Text(powersupply.name)
                    .font(.headline)
                Text("\(powersupply.type) · \(powersupply.efficiency) · \(powersupply.wattage)W")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                Text(String(format: "%.2f €", powersupply.price))
                    .font(.subheadline)
            }
        }
    }
}
