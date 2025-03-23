import { Case } from "./case"

const BASE_URL = "/api"

export async function loadAllCases(): Promise<Case[]> {
    try {
        const response = await fetch(`${BASE_URL}/cases`);
        
        if (!response.ok) {
            throw new Error("Fehler beim Laden der CPUs");
        }

        const data = await response.json();  // JSON-Daten werden hier verarbeitet
        return data as Case[];  // Annahme, dass die Antwort ein Array von CPUs ist
    } catch (error) {
        console.error(error);
        return [];  // Rückgabe eines leeren Arrays im Fehlerfall
    }
}
