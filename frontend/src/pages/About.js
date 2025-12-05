import React from "react";
import { Rocket, Monitor, Zap, Cpu } from 'lucide-react';

export default function About() {
  const logoBlue = '#009fe3';
  const logoBlueShadow = '#0073b9';

  const cardBaseStyle = "p-6 rounded-xl border-2 shadow-sm transition-all duration-300 transform h-full";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 via-white to-white text-gray-900 flex flex-col items-center p-4 sm:p-8 pt-16">
      <div className="max-w-7xl w-full text-center">

        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
          <span className="text-blue-600">PC-</span>
          <span style={{ color: logoBlueShadow }}>Konfigurator</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Mit unserem Konfigurator kannst du deinen individuellen PC Schritt für Schritt zusammenstellen, seine Komponenten auf Kompatibilität prüfen und das fertige Setup in einer 3D-Ansicht betrachten – bevor du etwas kaufst.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

          <div
            className={`${cardBaseStyle} border-blue-600 bg-blue-50`}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <Rocket className="w-8 h-8 mr-3 text-blue-600" />
              Ziel & Motivation
            </h2>
            <p className="text-gray-700 text-lg">
              Der Konfigurator soll den PC-Bau für alle zugänglich machen. Fehlkäufe werden vermieden, die Kaufentscheidung wird erleichtert und die visuelle Harmonie der Komponenten sichtbar gemacht – alles in einer interaktiven und verständlichen Umgebung.
            </p>
          </div>

          <div
            className={`${cardBaseStyle} border-blue-600 bg-blue-50`}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <Monitor className="w-8 h-8 mr-3 text-blue-600" />
              Funktionen & Nutzung
            </h2>
            <ul className="list-none space-y-3 text-gray-700 text-lg">
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-2xl font-extrabold text-blue-600">•</span>
                Schrittweises Auswählen aller Hauptkomponenten (Mainboards, CPUs, RAM, GPUs usw.).
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-2xl font-extrabold text-blue-600">•</span>
                Automatische Prüfung der Kompatibilität der ausgewählten Teile.
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-2xl font-extrabold text-blue-600">•</span>
                Fortschritt und Auswahl jederzeit im Blick behalten.
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-2xl font-extrabold text-blue-600">•</span>
                3D-Visualisierung der finalen PC-Konfiguration für eine realistische Vorschau.
              </li>
            </ul>
          </div>

          <div
            className={`${cardBaseStyle} border-blue-600 bg-blue-50`}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <Zap className="w-8 h-8 mr-3 text-blue-600" />
              3D-Modelle & AR
            </h2>
            <p className="text-gray-700 text-lg">
              Um die Konfiguration in 3D oder AR (Erweiterte Realität) darzustellen, werden detaillierte Modelle der Komponenten benötigt. Dies ermöglicht eine realistische Vorschau des fertigen PCs und erleichtert die Entscheidung. Der Fokus liegt auf visueller Präsentation und einem räumlichen Eindruck.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}