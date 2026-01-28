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

function PrintOnlyComponents({ items }) {
  return (
    <div className="print-only hidden print:block">
      <div className="w-full max-w-[820px] mx-auto p-8 grid grid-cols-1 gap-4">
        {items.map((it) => (
          <div
            key={it.key}
            className="border border-gray-300 rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="w-24 h-20 rounded-xl border bg-white flex items-center justify-center overflow-hidden">
              <img
                src={it.img || "https://placehold.co/96x60/FFFFFF/CCCCCC?text="}
                alt={it.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://placehold.co/96x60/FFFFFF/CCCCCC?text=";
                }}
                className="w-full h-full object-contain p-1"
              />
            </div>

            <div className="min-w-0">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {it.label}
              </div>
              <div className="text-lg font-bold text-gray-900 truncate">
                {it.name}
              </div>

              {it.details?.length > 0 && (
                <div className="mt-1 text-sm text-gray-700">
                  {it.details.join(" • ")}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Summary() {
  const rawSelections = [
    { label: "Gehäuse", key: "selectedComponent_Case" },
    { label: "CPU", key: "selectedComponent_CPU" },
    { label: "Mainboard", key: "selectedComponent_Mainboard" },
    { label: "GPU", key: "selectedComponent_GPU" },
    { label: "RAM", key: "selectedComponent_RAM" },
    { label: "Kühlung", key: "selectedComponent_Cooler" },
    { label: "Netzteil", key: "selectedComponent_PSU" },
    { label: "Speicher", key: "selectedComponent_Storage" },
  ];

  const selectionsForScreen = rawSelections.map((s) => {
    const item = readSelected(s.key);
    return { ...s, name: item?.name ?? null };
  });

  const selectionsForPrint = rawSelections
    .map((s) => {
      const item = readSelected(s.key);
      if (!item?.name) return null;

      const details = [
        item.socket && `Sockel: ${item.socket}`,
        item.form_factor && `Format: ${item.form_factor}`,
        item.type && `Typ: ${item.type}`,
        item.capacity && `Kapazität: ${item.capacity}`,
        item.memory && `VRAM: ${item.memory}`,
        item.wattage && `Leistung: ${item.wattage} W`,
        item.efficiency && `Effizienz: ${item.efficiency}`,
        item.clock_speed && `Takt: ${item.clock_speed} MHz`,
        item.core_count && `Kerne/Threads: ${item.core_count}`,
        item.module_count && `Module: ${item.module_count}`,
        item.gb_per_module && `GB/Modul: ${item.gb_per_module}`,
        item.min_rpm && `Min. RPM: ${item.min_rpm}`,
        item.max_noise_level && `Max. dB: ${item.max_noise_level}`,
        item.chipset && `Chipsatz: ${item.chipset}`,
      ].filter(Boolean);

      return {
        ...s,
        name: item.name,
        img: item.img ?? null,
        details,
      };
    })
    .filter(Boolean);

  const canPrint = selectionsForPrint.length > 0;

  return (
    <>
      {/* PRINT CSS */}
      <style>{`
        @media print {
          /* ALLES außer Print-View ausblenden */
          .no-print { display: none !important; }
          .print-only { display: block !important; }

          /* Navbar sicher ausblenden */
          nav { display: none !important; }

          body { background: white !important; }
        }
      `}</style>

      {/* SCREEN */}
      <div className="no-print min-h-[calc(100vh-64px)] bg-gray-50 text-gray-900 flex flex-col items-center p-6 pt-8">
        <div className="max-w-6xl w-full">
          <Breadcrumbs />

          <div className="mb-6 p-4 bg-white rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border border-gray-100">
            <h1 className="text-2xl font-bold">
              Zusammenfassung deiner Konfiguration
            </h1>

            <button
              onClick={() => window.print()}
              disabled={!canPrint}
              className={
                canPrint
                  ? "px-6 py-2.5 rounded-full bg-logoBlueShadow text-white font-bold shadow-lg hover:bg-logoBlue-dark transition"
                  : "px-6 py-2.5 rounded-full bg-gray-200 text-gray-500 font-bold cursor-not-allowed"
              }
            >
              Übersicht drucken
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectionsForScreen.map((s) => (
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

      <PrintOnlyComponents items={selectionsForPrint} />
    </>
  );
}
