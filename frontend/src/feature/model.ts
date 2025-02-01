import { CPU } from "./cpu/cpu"
import { Motherboard } from "./motherboard/mb"

interface Model {
    cpu: CPU
    motherboard: Motherboard
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
    set(model: Model, p: string | symbol, newValue: any, receiver: any) {
        const success = Reflect.set(model, p, newValue, receiver)
        followers.forEach(follower => follower(model))
        return success
    }
}

const model = new Proxy(state, handler)

export { model, Model, subscribe }
