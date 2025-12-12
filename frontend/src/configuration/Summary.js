import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

export function Summary() {

    const BREADCRUMB_STEPS = [
        { label: "CPU", path: "/cpu-config", ssKey: "selectedComponent_CPU" },
        { label: "Mainboard", path: "/motherboard-config", ssKey: "selectedComponent_Motherboard" },
        { label: "RAM", path: "/ram-config", ssKey: "selectedComponent_RAM" },
        { label: "Speicher", path: "/storage-config", ssKey: "selectedComponent_SSDHDD" },
        { label: "GPU", path: "/gpu-config", ssKey: "selectedComponent_GPU" }, 
        { label: "Kühlung", path: "/cooling-config", ssKey: "selectedComponent_Cooler" },
        { label: "Netzteil (PSU)", path: "/psu-config", ssKey: "selectedComponent_PowerSupply" },
        { label: "Gehäuse", path: "/case-config", ssKey: "selectedComponent_Case" },
        { label: "Übersicht", path: "/summary", ssKey: "summary" },
    ];

    const COMPONENT_KEYS = BREADCRUMB_STEPS.slice(0, -1).map(step => ({
        title: step.label,
        icon: step.icon, 
        sessionStorageKey: step.ssKey
    }));

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 text-gray-900 flex flex-col items-center p-8 pt-16">

            <div className="max-w-6xl w-full">
                <Breadcrumbs />
                <div className="mb-10 p-4 bg-white rounded-xl flex justify-between items-center border border-gray-100">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold">Zusammenfassung deiner Konfiguration</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}