import { CPU } from "src/model"

const BASE_URL = "/api"

export async function loadAllCPUs() {
    const response = await fetch(`${BASE_URL}/cpus`)
    const cpus: CPU[] = await response.json()
    return cpus
}