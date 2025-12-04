import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../images/Logo_Fertig.png";

export default function Home() {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 via-white to-white text-gray-900 flex items-center justify-center p-8">
            <div className="max-w-4xl mx-auto text-center">

                <div className="mb-8">
                    <img
                        src={logoImage}
                        alt="Computer3DConfigurator Logo"
                        className="w-48 h-auto mx-auto mix-blend-multiply"
                    />
                </div>

                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight text-gray-900 whitespace-nowrap">
                    Dein <span className="text-logoBlue">Traum-PC</span>, visualisiert in <span className="text-logoBlue">3D</span>.
                </h1>

                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Willkommen beim <strong>Computer3DConfigurator</strong>! Entdecke, wie du Gaming- und Workstation-Systeme in Echtzeit zusammenstellen kannst, jedes Detail in 3D anschaust und deine Komponenten im Blick behältst. Vom Case bis zum Speicher – <strong>gestalte dein perfektes System.</strong>
                </p>

                <Link
                    to="/case-config"
                    className="inline-block px-10 py-4 text-lg font-bold text-white bg-logoBlueShadow rounded-full shadow-xl hover:bg-logoBlue-dark transform hover:scale-105 transition duration-300 ease-in-out"
                >
                    Konfigurator starten
                    <span aria-hidden="true" className="ml-2">&rarr;</span>
                </Link>
            </div>
        </div>
    );
}
