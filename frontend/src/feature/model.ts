import { CPU } from "./cpu/cpu"
import { Motherboard } from "./motherboard/mb"
import { Gpu } from "./gpu/gpu" // Füge das GPU Interface hinzu

interface Model {
    cpu: CPU
    motherboard: Motherboard
    gpu: Gpu // Füge die GPU als neues Feld hinzu
    componentsShown: number
}

const state: Model = {
    cpu: {
        cpu_id: 0,
        name: "",
        price: 0,
        core_count: 0,
        core_clock: 0,
        boost_clock: 0,
        tdp: 0,
        graphics: "",
        smt: false,
        socket: "",
        img: ""
    },
    motherboard: {
        motherboard_id: 0,
        name: "",
        price: 0,
        socket: "",
        form_factor: "",
        max_memory: 0,
        memory_slot: 0,
        color: "",
        img: ""
    },
    gpu: { // Initialisiere das GPU-Objekt
        gpu_id: 0,
        name: "",
        price: 0,
        chipset: "",
        memory: 0,
        core_clock: 0,
        boost_clock: 0,
        color: "",
        length: 0,
        img: ""
    },
    componentsShown: 0
}

type Subscription = (model: Model) => void

const followers: Subscription[] = []

function subscribe(subscription: Subscription) {
    followers.push(subscription)
}

const handler: ProxyHandler<Model> = {
    get(target, prop, receiver) {
        return Reflect.get(target, prop, receiver)
    },
    set(model: Model, prop: keyof Model, newValue: any, receiver: any) {
        const success = Reflect.set(model, prop, newValue, receiver)
        followers.forEach(follower => follower(model))
        return success
    }
}

const model = new Proxy(state, handler)

export { model, Model, subscribe }
