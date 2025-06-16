//
//  CaseRowView.swift
//  swiftFrontend
//
//  Created by Julian Murach on 16.06.25.
//


import SwiftUI

struct CaseRowView: View {
    let caseModel: Case

    var body: some View {
        HStack {
            AsyncImage(url: URL(string: caseModel.img)) { image in
                image.resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 60, height: 60)
            } placeholder: {
                ProgressView()
                    .frame(width: 60, height: 60)
            }

            VStack(alignment: .leading) {
                Text(caseModel.name)
                    .font(.headline)
                Text("\(caseModel.type) – \(caseModel.color)")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                Text(String(format: "%.2f €", caseModel.price))
                    .font(.subheadline)
            }
        }
    }
}
