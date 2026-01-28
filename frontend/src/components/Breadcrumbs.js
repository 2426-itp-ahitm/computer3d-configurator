import { Link, useLocation } from "react-router-dom";
import { CONFIG_STEPS } from "./steps";

const STEP_TO_SSKEY = {
  "/case-config": "selectedComponent_Case",
  "/cpu-config": "selectedComponent_CPU",
  "/motherboard-config": "selectedComponent_Mainboard",
  "/gpu-config": "selectedComponent_GPU",
  "/ram-config": "selectedComponent_RAM",
  "/cooling-config": "selectedComponent_Cooler",
  "/psu-config": "selectedComponent_PSU",
  "/storage-config": "selectedComponent_Storage",
};

const GATE_BY_STEP = {
  "/case-config": null,
  "/cpu-config": "selectedComponent_Case",
  "/motherboard-config": "selectedComponent_CPU",
  "/gpu-config": "selectedComponent_Mainboard",
  "/ram-config": "selectedComponent_GPU",
  "/cooling-config": "selectedComponent_RAM",
  "/psu-config": "selectedComponent_Cooler",
  "/storage-config": "selectedComponent_PSU",
};

function hasSelection(key) {
  if (!key) return true;
  const raw = sessionStorage.getItem(key);
  if (!raw) return false;
  try {
    return !!JSON.parse(raw);
  } catch {
    return false;
  }
}

function getSelectedForStep(step) {
  const key = STEP_TO_SSKEY[step.path];
  if (!key) return null;
  const raw = sessionStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function Breadcrumbs() {
  const location = useLocation();
  const currentIndex = CONFIG_STEPS.findIndex(
    (step) => step.path === location.pathname
  );

  return (
    <div className="w-full mb-20">
      <div className="flex justify-between gap-3">
        {CONFIG_STEPS.map((step, index) => {
          const isActive = index === currentIndex;

          const gateKey = GATE_BY_STEP[step.path];
          const canClick = hasSelection(gateKey) || index <= currentIndex;

          const selected = getSelectedForStep(step);
          const isSelected = !!selected;

          const linkClasses = `
            w-full h-10 rounded-lg flex items-center justify-center
            text-sm font-semibold border transition
            ${
              isActive
                ? "bg-blue-600 text-white"
                : isSelected
                ? "bg-blue-100 text-blue-800"
                : canClick
                ? "bg-white text-gray-600 hover:bg-gray-50"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
          `;

          return (
            <div
              key={step.path}
              className="flex-1 min-w-0 flex flex-col items-center gap-2 rounded-xl border-2 px-2 py-2"
            >
              {canClick ? (
                <Link to={step.path} className={linkClasses}>
                  <span className="truncate px-1">{step.label}</span>
                </Link>
              ) : (
                <div className={linkClasses} aria-disabled="true">
                  <span className="truncate px-1">{step.label}</span>
                </div>
              )}

              <div className="w-full flex items-center justify-center">
                {/* relative + group bleibt, Tooltip kommt als sibling zum img */}
                <div className="relative group w-[96px] h-[60px]">
                  {selected ? (
                    <>
                      <img
                        src={selected.img}
                        alt={selected.name || step.label}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://placehold.co/96x60/FFFFFF/CCCCCC?text=";
                        }}
                        className="
                          w-full h-full object-contain
                          rounded-lg border bg-white p-1
                          transition-transform duration-200
                          group-hover:scale-[1.5]
                          group-hover:z-20
                        "
                      />

                      {/* Tooltip (Name) */}
                      {selected.name && (
                        <div
                          className="
                            pointer-events-none
                            absolute left-1/2 -translate-x-1/2
                            top-full mt-2
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-150
                            z-30
                          "
                        >
                          <div className="max-w-[220px] whitespace-nowrap overflow-hidden text-ellipsis text-xs bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg">
                            {selected.name}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full rounded-lg border border-dashed border-black bg-white" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
