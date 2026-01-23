import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";

function readSelected(key) {
  const raw = sessionStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function Summary() {
  const selections = [
    { label: "Gehäuse", key: "selectedComponent_Case" },
    { label: "CPU", key: "selectedComponent_CPU" },
    { label: "Mainboard", key: "selectedComponent_Mainboard" },
    { label: "GPU", key: "selectedComponent_GPU" },
    { label: "RAM", key: "selectedComponent_RAM" },
    { label: "Kühlung", key: "selectedComponent_Cooler" },
    { label: "Netzteil", key: "selectedComponent_PSU" },
    { label: "Speicher", key: "selectedComponent_Storage" },
  ].map((s) => {
    const item = readSelected(s.key);
    return { ...s, name: item?.name ?? null };
  });

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 text-gray-900 flex flex-col items-center p-6 pt-8">
      <div className="max-w-6xl w-full">
        <Breadcrumbs />

        <div className="mb-6 p-4 bg-white rounded-xl flex justify-between items-center border border-gray-100">
          <h1 className="text-2xl font-bold">Zusammenfassung deiner Konfiguration</h1>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selections.map((s) => (
              <div key={s.key} className="rounded-xl border p-4 bg-gray-50">
                <div className="text-sm text-gray-500 mb-1">{s.label}</div>
                <div className="text-lg font-semibold text-gray-900">
                  {s.name ?? "Nicht ausgewählt"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
