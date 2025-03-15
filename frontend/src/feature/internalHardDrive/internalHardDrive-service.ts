import { InternalHardDrive } from "./internalHardDrive"

const BASE_URL = "/api"

export async function loadAllInternalHardDrive(): Promise<InternalHardDrive[]> {
    try {
        const response = await fetch(`${BASE_URL}/internalHardDrive`);
        
        if (!response.ok) {
            throw new Error("Fehler beim Laden der RAMs");
        }

        const data = await response.json();  // JSON-Daten werden hier verarbeitet
        return data as InternalHardDrive[];  // Annahme, dass die Antwort ein Array von GPUs ist
    } catch (error) {
        console.error(error);
        return [];  // Rückgabe eines leeren Arrays im Fehlerfall
    }
}
