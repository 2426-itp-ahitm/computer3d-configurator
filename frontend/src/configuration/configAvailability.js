import { API_URL } from "../auth/keycloak";
import { CONFIG_STEPS } from "../components/steps";

const enc = (v) => encodeURIComponent(String(v));

export const STEP_TO_SSKEY = {
  "/case-config": "selectedComponent_Case",
  "/cpu-config": "selectedComponent_CPU",
  "/motherboard-config": "selectedComponent_Mainboard",
  "/gpu-config": "selectedComponent_GPU",
  "/ram-config": "selectedComponent_RAM",
  "/cooling-config": "selectedComponent_Cooler",
  "/psu-config": "selectedComponent_PSU",
  "/storage-config": "selectedComponent_Storage",
};

export const AVAILABILITY_PREFIX = "componentAvailability_";
export const CACHE_PREFIX = "hardwareCache_";

function readJsonFromSessionStorage(key) {
  const raw = sessionStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getSelectedConfigContext() {
  return {
    selectedCase: readJsonFromSessionStorage(STEP_TO_SSKEY["/case-config"]),
    selectedCpu: readJsonFromSessionStorage(STEP_TO_SSKEY["/cpu-config"]),
    selectedMb: readJsonFromSessionStorage(STEP_TO_SSKEY["/motherboard-config"]),
    selectedGpu: readJsonFromSessionStorage(STEP_TO_SSKEY["/gpu-config"]),
    selectedRam: readJsonFromSessionStorage(STEP_TO_SSKEY["/ram-config"]),
    selectedCooler: readJsonFromSessionStorage(STEP_TO_SSKEY["/cooling-config"]),
    selectedPsu: readJsonFromSessionStorage(STEP_TO_SSKEY["/psu-config"]),
    selectedStorage: readJsonFromSessionStorage(STEP_TO_SSKEY["/storage-config"]),
  };
}

export function getAvailabilityKey(stepPath) {
  return `${AVAILABILITY_PREFIX}${stepPath}`;
}

export function getCacheKey(endpoint) {
  return `${CACHE_PREFIX}${endpoint}`;
}

export function getAvailabilityForStep(stepPath) {
  return readJsonFromSessionStorage(getAvailabilityKey(stepPath));
}

function getResolvedEndpointForPath(stepPath, ctx) {
  switch (stepPath) {
    case "/case-config":
      return "/cases";

    case "/cpu-config": {
      const socket = ctx.selectedMb?.socket;
      return socket ? `/cpus/by-motherboard-socket/${enc(socket)}` : "/cpus";
    }

    case "/motherboard-config": {
      const cpuSocket = ctx.selectedCpu?.socket;
      const caseType = ctx.selectedCase?.type;
      const ramType = ctx.selectedRam?.socket;

      if (ramType && cpuSocket && caseType) {
        return `/motherboards/by-RAM-Type-CPU-Socket-Case-Type/${enc(ramType)}/${enc(
          cpuSocket
        )}/${enc(caseType)}`;
      }
      if (ramType && cpuSocket) {
        return `/motherboards/by-RAM-Type-And-CPU-Socket/${enc(ramType)}/${enc(cpuSocket)}`;
      }
      if (ramType && caseType) {
        return `/motherboards/by-RAM-Type-Case-Type/${enc(ramType)}/${enc(caseType)}`;
      }
      if (cpuSocket && caseType) {
        return `/motherboards/by-CPU-Socket-Case-Type/${enc(cpuSocket)}/${enc(caseType)}`;
      }
      if (ramType) {
        return `/motherboards/by-RAM-Type/${enc(ramType)}`;
      }
      if (cpuSocket) {
        return `/motherboards/by-cpu-socket/${enc(cpuSocket)}`;
      }
      return "/motherboards";
    }

    case "/gpu-config":
      return "/gpus";

    case "/ram-config": {
      const mbRamType = ctx.selectedMb?.ram_type;
      return mbRamType ? `/rams/by-Motherboard-Type/${enc(mbRamType)}` : "/rams";
    }

    case "/cooling-config":
      return "/cpu-cooler";

    case "/psu-config": {
      const caseType = ctx.selectedCase?.type;
      return caseType ? `/powersupply/by-CaseType/${enc(caseType)}/` : "/powersupply";
    }

    case "/storage-config":
      return "/internalharddrive";

    default:
      return null;
  }
}

async function fetchArray(endpoint, token) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Ungültige Daten: Erwartet Array");
  }

  return data;
}

function syncSelectedItemWithAvailableData(stepPath, data) {
  const selectionKey = STEP_TO_SSKEY[stepPath];
  if (!selectionKey) return false;

  const selected = readJsonFromSessionStorage(selectionKey);
  if (!selected) return false;

  const idKeyMap = {
    "/case-config": "case_id",
    "/cpu-config": "cpu_id",
    "/motherboard-config": "motherboard_id",
    "/gpu-config": "gpu_id",
    "/ram-config": "ram_id",
    "/cooling-config": "cpu_cooler_id",
    "/psu-config": "powersupply_id",
    "/storage-config": "internalHarddrive_id",
  };

  const idKey = idKeyMap[stepPath];
  if (!idKey) return false;

  const stillExists = data.some((item) => item?.[idKey] === selected?.[idKey]);

  if (!stillExists) {
    sessionStorage.removeItem(selectionKey);
    return true;
  }

  return false;
}

export async function refreshAllStepAvailabilities() {
  const token = localStorage.getItem("keycloakToken");
  if (!token || token === "null" || token === "undefined") return;

  const ctx = getSelectedConfigContext();
  let anySelectionRemoved = false;

  for (const step of CONFIG_STEPS) {
    const endpoint = getResolvedEndpointForPath(step.path, ctx);
    if (!endpoint) continue;

    try {
      const data = await fetchArray(endpoint, token);

      sessionStorage.setItem(getCacheKey(endpoint), JSON.stringify(data));
      sessionStorage.setItem(
        getAvailabilityKey(step.path),
        JSON.stringify({
          endpoint,
          count: data.length,
          available: data.length > 0,
          updatedAt: Date.now(),
        })
      );

      const removed = syncSelectedItemWithAvailableData(step.path, data);
      if (removed) {
        anySelectionRemoved = true;
      }
    } catch {
      sessionStorage.setItem(
        getAvailabilityKey(step.path),
        JSON.stringify({
          endpoint,
          count: 0,
          available: false,
          updatedAt: Date.now(),
        })
      );
    }
  }

  if (anySelectionRemoved) {
    window.dispatchEvent(new Event("selection-changed"));
    return;
  }

  window.dispatchEvent(new Event("availability-changed"));
}