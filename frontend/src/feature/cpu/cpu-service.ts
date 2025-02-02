import { CPU } from "./cpu"

const BASE_URL = "/api"

export async function loadAllCPUs(): Promise<CPU[]> {
    try {
        const response = await fetch(`${BASE_URL}/cpus`);
        
        if (!response.ok) {
            throw new Error("Fehler beim Laden der CPUs");
        }

        const data = await response.json();  // JSON-Daten werden hier verarbeitet
        return data as CPU[];  // Annahme, dass die Antwort ein Array von CPUs ist
    } catch (error) {
        console.error(error);
        return [];  // Rückgabe eines leeren Arrays im Fehlerfall
    }
}
