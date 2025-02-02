import { Motherboard } from "./mb"

const BASE_URL = "/api"

export async function loadAllMotherboards(): Promise<Motherboard[]> {
    try {
        const response = await fetch(`${BASE_URL}/motherboards`);
        
        if (!response.ok) {
            throw new Error("Fehler beim Laden der Motherboards");
        }

        const data = await response.json();  // JSON-Daten werden hier verarbeitet
        return data as Motherboard[];  // Annahme, dass die Antwort ein Array von Motherboards ist
    } catch (error) {
        console.error(error);
        return [];  // Rückgabe eines leeren Arrays im Fehlerfall
    }
}
