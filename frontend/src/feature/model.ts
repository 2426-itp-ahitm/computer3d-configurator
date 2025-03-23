import { CPU } from "./cpu/cpu";
import { Motherboard } from "./motherboard/mb";
import { Gpu } from "./gpu/gpu";
import { Ram } from "./ram/ram";
import { InternalHardDrive } from "./internalHardDrive/internalHardDrive";
import { Case } from "./case/case"

/**
 * Model beschreibt den globalen Zustand.
 * Hier wurde zusätzlich `cpuSocket` eingefügt,
 * um den aktuell gewählten CPU-Sockel global zu speichern.
 */
interface Model {
  ram: Ram;
  cpu: CPU;
  motherboard: Motherboard;
  gpu: Gpu;
  componentsShown: number;
  internalHardDrive: InternalHardDrive;
  case: Case;

  // Neu: CPU-Socket global speichern
  cpuSocket: string; 

  // Neu: shoppingCartId
  shoppingCartId: number | null;
}

/**
 * Initialzustand des Models.
 */
const state: Model = {
  ram: {
    ram_id: 0,
    name: "",
    price: 0,
    type: "",
    clock_speed: 0,
    module_count: 0,
    gb_per_module: 0,
    price_per_gb: 0,
    color: "",
    first_word_latency: 0,
    cas_latency: 0,
    img: ""
  },
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
    img: "",
    ramType: ""
  },
  gpu: {
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
  internalHardDrive: {
    internalHarddrive_id: 0,
    name: "",
    price: 0,
    capacity: 0,
    pricePerGb: 0,
    type: "",
    cache: 0,
    formFactor: "",
    memoryInterface: "",
    image: ""
  },
  case: {
    case_id: 0,
    name: "",
    price: 0,
    type: "",
    color: "",
    psu: 0,
    side_panel: "",
    external_volume: 0,
    internal_35_bays: 0,
    img: ""
  },
  componentsShown: 0,

  // Neu hinzugefügt
  cpuSocket: "",
  shoppingCartId: 1 // Anfangs null, wird beim Laden/Erstellen gesetzt
};

type Subscription = (model: Model) => void;
const followers: Subscription[] = [];

/**
 * Ermöglicht das Abonnieren von Model-Änderungen.
 */
function subscribe(subscription: Subscription) {
  followers.push(subscription);
}

/**
 * Proxy-Handler, der bei Änderungen im Model alle Abonnenten benachrichtigt.
 */
const handler: ProxyHandler<Model> = {
  get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver);
  },
  set(model: Model, prop: keyof Model, newValue: any, receiver: any) {
    const success = Reflect.set(model, prop, newValue, receiver);
    followers.forEach(follower => follower(model));
    return success;
  }
};

/**
 * Der eigentliche Proxy für den globalen Zustand.
 */
const model = new Proxy(state, handler);

export { model, Model, subscribe };
