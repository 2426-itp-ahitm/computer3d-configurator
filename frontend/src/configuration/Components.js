import HardwareConfig from "./HardwareConfig";
import {
  LayoutList,
  Cpu,
  HardDrive,
  MemoryStick,
  Snowflake,
  Power,
  Disc,
} from "lucide-react";

const REQUIRED = ["Case", "CPU", "Mainboard", "GPU", "RAM", "Cooler", "PSU", "Storage"];
const enc = (v) => encodeURIComponent(String(v));

export function CaseConfig() {
  return (
    <HardwareConfig
      Icon={LayoutList}
      title="Case"
      endpoint="/cases"
      nextPath="/cpu-config"
      prevPath="/"
      itemIdKey="case_id"
      displayFields={[{ key: "type", label: "Formfaktor" }]}
      requiredSelections={REQUIRED}
    />
  );
}

export function CPUConfig() {
  return (
    <HardwareConfig
      Icon={Cpu}
      title="CPU"
      endpoint="/cpus"
      endpointResolver={({ selectedMb }) => {
        const socket = selectedMb?.socket;
        return socket ? `/cpus/by-motherboard-socket/${enc(socket)}` : "/cpus";
      }}
      nextPath="/motherboard-config"
      prevPath="/case-config"
      itemIdKey="cpu_id"
      displayFields={[
        { key: "socket", label: "Sockel" },
        { key: "core_count", label: "Kerne/Threads" },
      ]}
      requiredSelections={REQUIRED}
    />
  );
}

export function MotherboardConfig() {
  return (
    <HardwareConfig
      Icon={LayoutList}
      title="Mainboard"
      endpoint="/motherboards"
      endpointResolver={({ selectedCase, selectedCpu, selectedRam }) => {
        const cpuSocket = selectedCpu?.socket;
        const caseType = selectedCase?.type;
        const ramType = selectedRam?.socket;

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
      }}
      nextPath="/gpu-config"
      prevPath="/cpu-config"
      itemIdKey="motherboard_id"
      displayFields={[
        { key: "socket", label: "Sockel" },
        { key: "form_factor", label: "Format" },
      ]}
      requiredSelections={REQUIRED}
    />
  );
}

export function GPUConfig() {
  return (
    <HardwareConfig
      Icon={HardDrive}
      title="GPU"
      endpoint="/gpus"
      nextPath="/ram-config"
      prevPath="/motherboard-config"
      itemIdKey="gpu_id"
      displayFields={[
        { key: "chipset", label: "Chipsatz" },
        { key: "memory", label: "VRAM" },
      ]}
      requiredSelections={REQUIRED}
    />
  );
}

export function RAMConfig() {
  return (
    <HardwareConfig
      Icon={MemoryStick}
      title="RAM"
      endpoint="/rams"
      endpointResolver={({ selectedMb }) => {
        const mbRamType = selectedMb?.ram_type;
        return mbRamType ? `/rams/by-Motherboard-Type/${enc(mbRamType)}` : "/rams";
      }}
      nextPath="/cooling-config"
      prevPath="/gpu-config"
      itemIdKey="ram_id"
      displayFields={[
        { key: "module_count", label: "Module" },
        { key: "gb_per_module", label: "GB/Modul" },
        { key: "clock_speed", label: "Takt (MHz)" },
      ]}
      requiredSelections={REQUIRED}
    />
  );
}

export function CoolingConfig() {
  return (
    <HardwareConfig
      Icon={Snowflake}
      title="Cooler"
      endpoint="/cpu-cooler"
      nextPath="/psu-config"
      prevPath="/ram-config"
      itemIdKey="cpu_cooler_id"
      displayFields={[
        { key: "min_rpm", label: "Min. RPM" },
        { key: "max_noise_level", label: "Max. dB" },
      ]}
      requiredSelections={REQUIRED}
    />
  );
}

export function PSUConfig() {
  return (
    <HardwareConfig
      Icon={Power}
      title="PSU"
      endpoint="/powersupply"
      endpointResolver={({ selectedCase }) => {
        const caseType = selectedCase?.type;
        return caseType ? `/powersupply/by-CaseType/${enc(caseType)}/` : "/powersupply";
      }}
      nextPath="/storage-config"
      prevPath="/cooling-config"
      itemIdKey="powersupply_id"
      displayFields={[
        { key: "wattage", label: "Leistung (Watt)" },
        { key: "efficiency", label: "Effizienz" },
      ]}
      requiredSelections={REQUIRED}
    />
  );
}

export function StorageConfig() {
  return (
    <HardwareConfig
      Icon={Disc}
      title="Storage"
      endpoint="/internalharddrive"
      nextPath="/summary"
      prevPath="/psu-config"
      itemIdKey="internalHarddrive_id"
      displayFields={[
        { key: "type", label: "Typ (SSD/HDD)" },
        { key: "capacity", label: "Kapazität" },
      ]}
      requiredSelections={REQUIRED}
    />
  );
}