// HardwareConfig.js
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, XCircle, Check, Loader } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import { API_URL, clearTokens } from "../auth/keycloak";

function HardwareConfig({
  Icon,
  title,
  subtitle,
  endpoint, // fallback endpoint
  endpointResolver, // (ctx) => endpoint string
  nextPath,
  prevPath,
  itemIdKey,
  displayFields = [],
  requiredSelections = [],
}) {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);

  const sessionStorageKey = `selectedComponent_${title.replace(/\s/g, "")}`;

  const cardBase =
    "bg-white p-5 rounded-lg border-2 flex flex-col items-center text-center flex-shrink-0 w-64";
  const cardSize = "min-h-[420px]";

  const imageWrap = "w-full h-[160px] flex items-center justify-center mb-4";
  const imageCls = "max-h-[160px] w-full object-contain rounded-md";
  const titleCls =
    "font-extrabold text-xl text-gray-900 mb-1 leading-tight line-clamp-2";

  const fallbackImg =
    "https://placehold.co/150x150/EEEEEE/AAAAAA?text=No+Image";

  const normalizeTitleToKey = (t) => String(t).replace(/\s/g, "");

  const requiredSessionKeys =
    requiredSelections && requiredSelections.length
      ? requiredSelections.map((t) => `selectedComponent_${normalizeTitleToKey(t)}`)
      : [];

  const areAllRequiredSelected = () => {
    if (!requiredSessionKeys.length) return false;
    return requiredSessionKeys.every((k) => {
      const v = sessionStorage.getItem(k);
      return v && v !== "null" && v !== "undefined" && v !== "";
    });
  };

  const readSelected = useCallback((componentTitle) => {
    const key = `selectedComponent_${normalizeTitleToKey(componentTitle)}`;
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }, []);

  const ctx = useMemo(() => {
    const selectedCase = readSelected("Case");
    const selectedCpu = readSelected("CPU");
    const selectedMb = readSelected("Mainboard");
    const selectedRam = readSelected("RAM");
    const selectedPsu = readSelected("PSU");
    return { selectedCase, selectedCpu, selectedMb, selectedRam, selectedPsu };
  }, [readSelected]);

  const resolvedEndpoint = useMemo(() => {
    const ep = endpointResolver ? endpointResolver(ctx) : endpoint;
    return ep || endpoint;
  }, [endpointResolver, endpoint, ctx]);

  const loadSelectionFromSessionStorage = () => {
    const storedItem = sessionStorage.getItem(sessionStorageKey);
    if (storedItem) {
      try {
        setSelectedItem(JSON.parse(storedItem));
      } catch {
        sessionStorage.removeItem(sessionStorageKey);
      }
    } else {
      setSelectedItem(null);
    }
  };

  const logoutAndRedirect = () => {
    clearTokens();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  const fetchData = useCallback(
    async (ep) => {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("keycloakToken");
      if (!token || token === "null" || token === "undefined") {
        setIsLoading(false);
        setError("Kein Token vorhanden");
        logoutAndRedirect();
        return;
      }

      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const res = await fetch(`${API_URL}${ep}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });

          if (res.status === 401 || res.status === 403) {
            logoutAndRedirect();
            return;
          }

          const ct = res.headers.get("content-type") || "";
          if (!res.ok) {
            const body = ct.includes("application/json")
              ? JSON.stringify(await res.json())
              : await res.text();
            throw new Error(`Server error: ${res.status} ${body}`);
          }

          const data = await res.json();
          if (!Array.isArray(data)) throw new Error("Ungültige Daten: Erwartet Array");

          setItems(data);

          // Wenn aktuell ausgewähltes Item nicht mehr in der kompatiblen Liste ist -> entfernen
          const stored = sessionStorage.getItem(sessionStorageKey);
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              const stillExists = data.some((x) => x?.[itemIdKey] === parsed?.[itemIdKey]);
              if (!stillExists) {
                sessionStorage.removeItem(sessionStorageKey);
                setSelectedItem(null);
                window.dispatchEvent(new Event("selection-changed"));
              }
            } catch {
              sessionStorage.removeItem(sessionStorageKey);
              setSelectedItem(null);
              window.dispatchEvent(new Event("selection-changed"));
            }
          }

          setIsLoading(false);
          return;
        } catch (err) {
          if (attempt === 2) {
            setError(err?.message || `Konnte Daten von ${ep} nicht laden.`);
            setIsLoading(false);
            return;
          }
          await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
        }
      }
    },
    [itemIdKey, navigate, sessionStorageKey]
  );

  useEffect(() => {
    loadSelectionFromSessionStorage();
    fetchData(resolvedEndpoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedEndpoint]);

  // Re-fetch & Selection reload wenn eine andere Komponente gewählt/entfernt wird
  useEffect(() => {
    const onSelectionChanged = () => {
      loadSelectionFromSessionStorage();
      if (areAllRequiredSelected()) setShowSummaryPopup(true);
      fetchData(resolvedEndpoint);
    };

    window.addEventListener("selection-changed", onSelectionChanged);
    return () => window.removeEventListener("selection-changed", onSelectionChanged);
  }, [resolvedEndpoint, requiredSessionKeys.join("|"), fetchData]);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(item));
    window.dispatchEvent(new Event("selection-changed"));
    if (nextPath === "/summary") setShowSummaryPopup(true);
  };

  const handleRemoveSelection = () => {
    sessionStorage.removeItem(sessionStorageKey);
    setSelectedItem(null);
    window.dispatchEvent(new Event("selection-changed"));
  };

  const ItemIcon = Icon;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 text-gray-900 flex">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center flex-1 px-6 py-8">
        <Breadcrumbs />

        {isLoading && (
          <div className="w-full bg-blue-100 p-8 rounded-xl flex justify-center items-center text-blue-800">
            <Loader size={24} className="animate-spin mr-3" />
            <p className="text-lg font-medium">Lade Daten...</p>
          </div>
        )}

        {error && (
          <div className="w-full bg-red-100 p-8 rounded-xl flex flex-col items-center text-red-800 border border-red-300">
            <XCircle size={32} className="mb-2" />
            <p className="text-lg font-medium">Fehler beim Laden: {error}</p>
            <button
              onClick={() => fetchData(resolvedEndpoint)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Erneut versuchen
            </button>
          </div>
        )}

        {!isLoading && !error && items.length > 0 && (
          <div className="w-full overflow-x-scroll pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="flex w-max min-w-full gap-6 snap-x snap-mandatory">
              {selectedItem && (
                <div className="sticky left-0 z-20 flex-shrink-0 w-64">
                  <div className={`${cardBase} ${cardSize} border-blue-600 shadow-md`}>
                    <div className={imageWrap}>
                      <img
                        src={selectedItem.img || fallbackImg}
                        alt={selectedItem.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = fallbackImg;
                        }}
                        className={imageCls}
                      />
                    </div>

                    <h3 className={titleCls}>{selectedItem.name}</h3>

                    <div className="text-sm text-gray-500 mt-1 mb-3">
                      {displayFields.map((field, i) => (
                        <p key={i}>
                          {field.label}:{" "}
                          <span className="font-medium text-gray-700">
                            {selectedItem[field.key] || "N/A"}
                          </span>
                        </p>
                      ))}
                    </div>

                    <div className="mt-auto pt-3 w-full flex flex-col gap-2">
                      <div className="py-1 px-3 bg-green-500 text-white font-bold rounded-full text-sm flex items-center justify-center">
                        <Check size={16} className="mr-1" /> Ausgewählt
                      </div>

                      <button
                        onClick={handleRemoveSelection}
                        className="flex items-center justify-center gap-1 text-sm px-3 py-1 border border-red-400 text-red-600 rounded-md hover:bg-red-50 transition"
                      >
                        <XCircle size={16} />
                        Entfernen
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-6">
                {items
                  .filter((it) =>
                    selectedItem ? it[itemIdKey] !== selectedItem[itemIdKey] : true
                  )
                  .map((it, index) => (
                    <div
                      key={it[itemIdKey] || `${it.name}-${index}`}
                      onClick={() => handleItemSelect(it)}
                      className={`${cardBase} ${cardSize} border-gray-200 hover:border-blue-500 transition duration-200 cursor-pointer snap-start`}
                    >
                      <div className={imageWrap}>
                        <img
                          src={it.img || fallbackImg}
                          alt={it.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = fallbackImg;
                          }}
                          className={`${imageCls} transition-transform duration-300`}
                        />
                      </div>

                      <h3 className={titleCls}>{it.name}</h3>

                      <div className="text-sm text-gray-500 mt-1 mb-3">
                        {displayFields.map((field, i) => (
                          <p key={i}>
                            {field.label}:{" "}
                            <span className="font-medium text-gray-700">
                              {it[field.key] || "N/A"}
                            </span>
                          </p>
                        ))}
                      </div>

                      <div className="mt-auto pt-3 w-full h-10" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {!isLoading && !error && items.length === 0 && (
          <div className="w-full bg-yellow-100 p-8 rounded-xl text-yellow-800">
            <p className="text-lg font-medium">
              Keine Komponenten gefunden. Die API lieferte eine leere Liste.
            </p>
          </div>
        )}

        {showSummaryPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowSummaryPopup(false)}
            />
            <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl border p-6">
              <div className="flex items-center gap-3 mb-2">
                <ItemIcon size={24} />
                <h2 className="text-xl font-bold">{title} ausgewählt</h2>
              </div>
              <p className="text-sm text-gray-600 mb-5">
                Zur Übersicht wechseln oder weiter vergleichen?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 transition"
                  onClick={() => setShowSummaryPopup(false)}
                >
                  Weiter auswählen
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition inline-flex items-center"
                  onClick={() => navigate("/summary")}
                >
                  Zur Übersicht <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HardwareConfig;