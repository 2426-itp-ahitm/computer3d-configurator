import { Gpu } from "./gpu"

const BASE_URL = "/api"

export async function loadAllGPUs(): Promise<Gpu[]> {
    try {
        const response = await fetch(`${BASE_URL}/gpus`);
        
        if (!response.ok) {
            throw new Error("Fehler beim Laden der GPUs");
        }

        const data = await response.json();  // JSON-Daten werden hier verarbeitet
        return data as Gpu[];  // Annahme, dass die Antwort ein Array von GPUs ist
    } catch (error) {
        console.error(error);
        return [];  // Rückgabe eines leeren Arrays im Fehlerfall
    }
}
