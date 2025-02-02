import { Motherboard } from "./mb"

const BASE_URL = "/api"

export async function loadAllMotherboards() {
    const response = await fetch(`${BASE_URL}/cpus`)
    return await response.json() as Motherboard[]
}