import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CONFIG_STEPS } from "./steps";
import {
  STEP_TO_SSKEY,
  getAvailabilityForStep,
  refreshAllStepAvailabilities,
} from "../configuration/configAvailability";

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

function canAccessStepByPrereqs(stepPath) {
  const idx = CONFIG_STEPS.findIndex((s) => s.path === stepPath);
  if (idx <= 0) return true;

  for (let i = 0; i < idx; i++) {
    const prevPath = CONFIG_STEPS[i]?.path;
    const key = STEP_TO_SSKEY[prevPath];
    if (!key || !hasSelection(key)) return false;
  }

  return true;
}

export default function Breadcrumbs() {
  const location = useLocation();
  const [, setTick] = useState(0);

  useEffect(() => {
    const rerender = () => setTick((t) => t + 1);

    const onSelectionChanged = async () => {
      rerender();
      await refreshAllStepAvailabilities();
      rerender();
    };

    const onAvailabilityChanged = () => {
      rerender();
    };

    window.addEventListener("selection-changed", onSelectionChanged);
    window.addEventListener("availability-changed", onAvailabilityChanged);

    return () => {
      window.removeEventListener("selection-changed", onSelectionChanged);
      window.removeEventListener("availability-changed", onAvailabilityChanged);
    };
  }, []);

  const currentIndex = CONFIG_STEPS.findIndex(
    (step) => step.path === location.pathname
  );

  return (
    <div className="w-full mb-20">
      <div className="flex justify-between gap-3">
        {CONFIG_STEPS.map((step, index) => {
          const isActive = index === currentIndex;
          const isCurrentPath = step.path === location.pathname;
          const prereqsOk = canAccessStepByPrereqs(step.path);
          const canClick = prereqsOk || isCurrentPath;
          const selected = getSelectedForStep(step);
          const isSelected = !!selected;
          const availability = getAvailabilityForStep(step.path);
          const isUnavailable =
            availability && prereqsOk && availability.available === false;

          const linkClasses = `
            w-full h-10 rounded-lg flex items-center justify-center
            text-sm font-semibold border transition
            ${
              isActive
                ? "bg-blue-600 text-white"
                : !prereqsOk
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : isUnavailable
                ? "bg-red-100 text-red-700 border-red-300"
                : isSelected
                ? "bg-blue-100 text-blue-800"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }
          `;

          const cardClasses = `
            flex-1 min-w-0 flex flex-col items-center gap-2 rounded-xl border-2 px-2 py-2
            ${
              !prereqsOk && !isCurrentPath
                ? "opacity-60"
                : isUnavailable
                ? "border-red-300 bg-red-50/40"
                : ""
            }
          `;

          return (
            <div key={step.path} className={cardClasses}>
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
                  ) : isUnavailable ? (
                    <div className="w-full h-full rounded-lg border border-red-300 bg-red-100 flex items-center justify-center text-[10px] text-red-700 font-semibold text-center px-1">
                      Keine
                      <br />
                      Komponenten
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-lg border border-dashed border-black bg-white" />
                  )}
                </div>
              </div>

              {isUnavailable && (
                <div className="text-[11px] font-semibold text-red-700 text-center leading-tight">
                  Keine Komponenten gefunden
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}