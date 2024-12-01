import { Motherboard } from "src/model"

const BASE_URL = "/api"

export async function loadAllMotherboards() {
    const response = await fetch(`${BASE_URL}/motherboards`)
    const motherboards: Motherboard[] = await response.json()
    return motherboards
}

// Neue Funktion, um CPUs für ein bestimmtes Motherboard abzurufen
export async function loadCpusByMotherboard(mbId: number) {
    const response = await fetch(`${BASE_URL}/cpus/by-motherboard/${mbId}`)
    if (!response.ok) {
        throw new Error(`Failed to fetch CPUs for motherboard with ID ${mbId}`)
    }
    const cpus = await response.json()
    return cpus
}