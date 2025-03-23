import { CpuCooler } from "./cpuCooler"

const BASE_URL = "/api"

export async function loadAllCpuCoolers(): Promise<CpuCooler[]> {
    try {
        const response = await fetch(`${BASE_URL}/cpu-cooler`);
        
        if (!response.ok) {
            throw new Error("Fehler beim Laden der CPUs");
        }

        const data = await response.json();  // JSON-Daten werden hier verarbeitet
        return data as CpuCooler[];  // Annahme, dass die Antwort ein Array von CPUs ist
    } catch (error) {
        console.error(error);
        return [];  // Rückgabe eines leeren Arrays im Fehlerfall
    }
}
