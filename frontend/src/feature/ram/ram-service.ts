import { Ram } from "./ram"

const BASE_URL = "/api"

export async function loadAllRams(): Promise<Ram[]> {
    try {
        const response = await fetch(`${BASE_URL}/rams`);
        
        if (!response.ok) {
            throw new Error("Fehler beim Laden der RAMs");
        }

        const data = await response.json();  // JSON-Daten werden hier verarbeitet
        return data as Ram[];  // Annahme, dass die Antwort ein Array von GPUs ist
    } catch (error) {
        console.error(error);
        return [];  // Rückgabe eines leeren Arrays im Fehlerfall
    }
}
