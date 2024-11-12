export interface CPU {
    cpu_id: number
    name: string
    price: number
    core_count: number
    core_clock: number
    boost_clock: number
    tdp: number
    graphics: string
    smt: boolean
    socket: string
}

export interface Motherboard {
    motherboard_id: number
    name: string
    price: number
    socket: string
    form_factor: string
    max_memory: number
    memory_slot: number
    color: string
}