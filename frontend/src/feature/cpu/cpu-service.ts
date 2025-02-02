import { CPU } from "./cpu"

const BASE_URL = "./api"

export async function loadAllCPUs() {
    const response = await fetch(`${BASE_URL}/cpus`)
    return await response.json() as CPU[]
}