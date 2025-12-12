import HardwareConfig from './HardwareConfig';
import { LayoutList, Cpu, HardDrive, MemoryStick, Snowflake, Power, Disc, Box } from 'lucide-react';

export function CaseConfig() {
    return (
        <HardwareConfig
            Icon={LayoutList}
            title="Case"
            endpoint="/api/cases"
            nextPath="/cpu-config"
            prevPath="/"
            itemIdKey="case_id"
            displayFields={[
                { key: "type", label: "Formfaktor" }
            ]}
        />
    );
}

export function CPUConfig() {
    return (
        <HardwareConfig
            Icon={Cpu}
            title="CPU"
            endpoint="/api/cpus"
            nextPath="/motherboard-config"
            prevPath="/case-config"
            itemIdKey="cpu_id"
            displayFields={[
                { key: 'socket', label: 'Sockel' },
                { key: 'core_count', label: 'Kerne/Threads' }
            ]}
        />
    );
}

export function MotherboardConfig() {
    return (
        <HardwareConfig
            Icon={LayoutList}
            title="Mainboard"
            endpoint="/api/motherboards"
            nextPath="/gpu-config"
            prevPath="/cpu-config"
            itemIdKey="motherboard_id"
            displayFields={[
                { key: 'socket', label: 'Sockel' },
                { key: 'form_factor', label: 'Format' }
            ]}
        />
    );
}

export function GPUConfig() {
    return (
        <HardwareConfig
            Icon={HardDrive}
            title="GPU"
            endpoint="/api/gpus"
            nextPath="/ram-config"
            prevPath="/motherboard-config"
            itemIdKey="gpu_id"
            displayFields={[
                { key: "chipset", label: "Chipsatz" },
                { key: "memory", label: "VRAM" }
            ]}
        />
    );
}

export function RAMConfig() {
    return (
        <HardwareConfig
            Icon={MemoryStick}
            title="RAM"
            endpoint="/api/rams"
            nextPath="/cooling-config"
            prevPath="/gpu-config"
            itemIdKey="ram_id"
            displayFields={[
                { key: "module_count", label: "Module" },
                { key: "gb_per_module", label: "GB/Modul" },
                { key: "clock_speed", label: "Takt (MHz)" }
            ]}
        />
    );
}

export function CoolingConfig() {
    return (
        <HardwareConfig
            Icon={Snowflake}
            title="Cooler"
            endpoint="/api/cpu-cooler"
            nextPath="/psu-config"
            prevPath="/ram-config"
            itemIdKey="cpu_cooler_id"
            displayFields={[
                { key: "min_rpm", label: "Min. RPM" },
                { key: "max_noise_level", label: "Max. dB" }
            ]}
        />
    );
}

export function PSUConfig() {
    return (
        <HardwareConfig
            Icon={Power}
            title="PSU"
            endpoint="/api/powersupply"
            nextPath="/storage-config"
            prevPath="/cooling-config"
            itemIdKey="powersupply_id"
            displayFields={[
                { key: 'wattage', label: 'Leistung (Watt)' },
                { key: 'efficiency', label: 'Effizienz' }
            ]}
        />
    );
}

export function StorageConfig() {
    return (
        <HardwareConfig
            Icon={Disc}
            title="Storage"
            endpoint="/api/internalharddrive"
            nextPath="/summary"
            prevPath="/psu-config"
            itemIdKey="internalHarddrive_id"
            displayFields={[
                { key: 'type', label: 'Typ (SSD/HDD)' },
                { key: 'capacity', label: 'Kapazität' }
            ]}
        />
    );
}
