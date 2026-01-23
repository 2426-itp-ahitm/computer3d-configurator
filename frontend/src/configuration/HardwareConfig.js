import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, XCircle, Check, Loader } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";

function HardwareConfig({
  Icon,
  title,
  subtitle,
  endpoint,
  nextPath,
  prevPath,
  itemIdKey,
  displayFields = [],
}) {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // nur für Storage→Summary
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);
  const isLastStepToSummary = nextPath === "/summary";

  const sessionStorageKey = `selectedComponent_${title.replace(/\s/g, "")}`;

  const loadSelectionFromSessionStorage = () => {
    const storedItem = sessionStorage.getItem(sessionStorageKey);
    if (storedItem) {
      try {
        setSelectedItem(JSON.parse(storedItem));
      } catch {
        sessionStorage.removeItem(sessionStorageKey);
      }
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetch(`http://localhost:8080${endpoint}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setItems(data);
        setIsLoading(false);
        return;
      } catch (err) {
        if (attempt === 2) {
          setError(`Konnte Daten von ${endpoint} nach mehreren Versuchen nicht laden.`);
          setIsLoading(false);
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      }
    }
  };

  useEffect(() => {
    loadSelectionFromSessionStorage();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(item));

    if (isLastStepToSummary) {
      setShowSummaryPopup(true);
    }
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
              onClick={fetchData}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Erneut versuchen
            </button>
          </div>
        )}



        {!isLoading && !error && items.length > 0 && (
          <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="flex w-max min-w-full gap-6 snap-x snap-mandatory">

              {/* Sticky ausgewählte Komponente */}
              {selectedItem && (
                <div className="sticky left-0 z-20 flex-shrink-0 w-64">
                  <div
                    className="
              bg-white p-5 rounded-lg border-2 border-blue-600
              flex flex-col items-center text-center
              shadow-md
            "
                  >
                    <img
                      src={selectedItem.img || "https://placehold.co/150x150/EEEEEE/AAAAAA?text=No+Image"}
                      alt={selectedItem.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/150x150/EEEEEE/AAAAAA?text=No+Image";
                      }}
                      className="w-full h-auto max-h-[160px] object-contain rounded-md mb-4"
                    />

                    <h3 className="font-extrabold text-xl text-gray-900 mb-1 leading-tight">
                      {selectedItem.name}
                    </h3>

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

                    <div className="mt-auto pt-3 w-full h-10">
                      <div className="py-1 px-3 bg-green-500 text-white font-bold rounded-full text-sm flex items-center justify-center">
                        <Check size={16} className="mr-1" /> Ausgewählt
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scrollbare Liste */}
              <div className="flex gap-6">
                {items
                  .filter((item) =>
                    selectedItem ? item[itemIdKey] !== selectedItem[itemIdKey] : true
                  )
                  .map((item, index) => (
                    <div
                      key={item[itemIdKey] || `${item.name}-${index}`}
                      onClick={() => handleItemSelect(item)}
                      className="
                bg-white p-5 rounded-lg border-2 transition duration-200 cursor-pointer
                flex-shrink-0 w-64 snap-start
                hover:border-blue-500 flex flex-col items-center text-center
                border-gray-200
              "
                    >
                      <img
                        src={item.img || "https://placehold.co/150x150/EEEEEE/AAAAAA?text=No+Image"}
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://placehold.co/150x150/EEEEEE/AAAAAA?text=No+Image";
                        }}
                        className="w-full h-auto max-h-[160px] object-contain rounded-md mb-4 transition-transform duration-300"
                      />

                      <h3 className="font-extrabold text-xl text-gray-900 mb-1 leading-tight">
                        {item.name}
                      </h3>

                      <div className="text-sm text-gray-500 mt-1 mb-3">
                        {displayFields.map((field, i) => (
                          <p key={i}>
                            {field.label}:{" "}
                            <span className="font-medium text-gray-700">
                              {item[field.key] || "N/A"}
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
            <p className="text-lg font-medium">Keine Komponenten gefunden. Die API lieferte eine leere Liste.</p>
          </div>
        )}

        {/* Popup nur nach Storage-Auswahl */}
        {showSummaryPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowSummaryPopup(false)}
            />
            <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl border p-6">
              <div className="flex items-center gap-3 mb-2">
                <ItemIcon size={24} />
                <h2 className="text-xl font-bold">Speicher ausgewählt</h2>
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
