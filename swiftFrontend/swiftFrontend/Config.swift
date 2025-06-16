//
//  Config.swift
//  swiftFrontend
//
//  Created by Julian Murach on 16.06.25.
//


import Foundation

enum Config {
    #if targetEnvironment(simulator)
    static let backendBaseURL = "http://localhost:8080"
    #else
    static let backendBaseURL = "http://172.20.10.2:8080" // IP deines Macs im iPhone-Hotspot
    #endif
}
