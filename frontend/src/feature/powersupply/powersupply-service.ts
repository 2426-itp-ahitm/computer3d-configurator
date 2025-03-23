import { PowerSupply } from "./powersupply";

const BASE_URL = "/api";

export async function loadAllPowerSupplies(): Promise<PowerSupply[]> {
    try {
        const response = await fetch(`${BASE_URL}/powersupply`);
        
        if (!response.ok) {
            throw new Error("Fehler beim Laden der Power Supplies");
        }

        const data = await response.json();  // JSON-Daten werden hier verarbeitet
        return data as PowerSupply[];  // Annahme, dass die Antwort ein Array von PowerSupplies ist
    } catch (error) {
        console.error(error);
        return [];  // Rückgabe eines leeren Arrays im Fehlerfall
    }
}
