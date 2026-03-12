import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../images/Logo_Fertig.png";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 via-white to-white text-gray-900 flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-snug sm:leading-tight md:leading-tight text-gray-900">
          Dein <span className="text-logoBlue">Traum-PC</span>, konfiguriert und als <span className="text-logoBlue">PDF</span> exportiert.
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Willkommen beim <strong>ComputerConfigurator</strong>! Stelle Gaming- und Workstation-Systeme Schritt für Schritt zusammen und behalte alle ausgewählten Komponenten im Überblick. Vom Gehäuse bis zum Speicher – konfiguriere dein perfektes System und <strong>exportiere die vollständige Zusammenstellung als PDF </strong>zum Speichern oder Drucken.
        </p>

        <Link
          to="/case-config"
          className="inline-block px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold text-white bg-logoBlueShadow rounded-full shadow-xl hover:bg-logoBlue-dark transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Konfigurator starten
          <span aria-hidden="true" className="ml-1 sm:ml-2">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
