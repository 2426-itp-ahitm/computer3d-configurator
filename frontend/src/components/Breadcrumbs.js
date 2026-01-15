import { Link, useLocation } from "react-router-dom";
import { CONFIG_STEPS } from "./steps";

function ssKeyFromStepLabel(label) {
  const map = {
    "Gehäuse": "Case",
    "CPU": "CPU",
    "Mainboard": "Mainboard",
    "GPU": "GPU",
    "RAM": "RAM",
    "Kühlung": "Cooler",
    "Netzteil": "PSU",
    "Speicher": "Storage",
    "Übersicht": null,
  };
  return map[label] ? `selectedComponent_${map[label]}` : null;
}

function getSelectedForStep(step) {
  const key = ssKeyFromStepLabel(step.label);
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
  const currentIndex = CONFIG_STEPS.findIndex(step => step.path === location.pathname);

  return (
    <div className="w-full mb-20">
      <div className="flex justify-between gap-3">
        {CONFIG_STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;

          const selected = getSelectedForStep(step);
          const imgSrc = selected?.img || "https://placehold.co/96x60/FFFFFF/CCCCCC?text=";
          const name = selected?.name || null;

          return (
            <div
              key={step.path}
              className="
                flex-1
                min-w-0
                flex flex-col items-center
                gap-2
                rounded-xl
                border-2 
                bg-whitex
                px-2 py-2
              "
            >
              <Link
                to={step.path}
                className={`
                  w-full
                  h-10
                  rounded-lg
                  flex items-center justify-center
                  text-sm font-semibold
                  border 
                  transition
                  ${isActive
                    ? "bg-blue-600 text-white"
                    : isCompleted
                      ? "bg-blue-100 text-blue-800"
                      : "bg-white text-gray-600"
                  }
                `}
              >
                <span className="truncate px-1">{step.label}</span>
              </Link>

              <div className="w-full flex items-center justify-center">
                <div className="relative group w-[96px] h-[60px]">
                  {selected ? (
                    <>
                      <img
                        src={imgSrc}
                        alt={name || step.label}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://placehold.co/96x60/FFFFFF/CCCCCC?text=";
                        }}
                        className="
                          w-full h-full object-contain
                          rounded-lg
                          border 
                          bg-white
                          p-1
                          transition-transform duration-200
                          group-hover:scale-[1.5]
                          group-hover:z-20
                        "
                      />

                      <div className="
                        absolute left-1/2 -translate-x-1/2 top-full mt-2
                        opacity-0 group-hover:opacity-100 transition-opacity
                        pointer-events-none z-30
                      ">
                        <div className="bg-black text-white text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap">
                          {name}
                        </div>
                      </div>
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