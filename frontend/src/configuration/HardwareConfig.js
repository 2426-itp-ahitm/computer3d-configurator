import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, XCircle, Check, Loader, ArrowLeft
} from 'lucide-react';
import Breadcrumbs from "../components/Breadcrumbs";

function HardwareConfig({
  Icon,
  title,
  subtitle,
  endpoint,
  nextPath,
  prevPath,
  itemIdKey,
  displayFields = []
}) {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const sessionStorageKey = `selectedComponent_${title.replace(/\s/g, '')}`;

  const loadSelectionFromSessionStorage = () => {
    const storedItem = sessionStorage.getItem(sessionStorageKey);
    if (storedItem) {
      try {
        setSelectedItem(JSON.parse(storedItem));
      } catch (e) {
        console.error("Fehler beim Parsen des sessionStorage-Elements:", e);
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
        console.error(`Fehler beim Laden (Versuch ${attempt + 1}):`, err);
        if (attempt === 2) {
          setError(`Konnte Daten von ${endpoint} nach mehreren Versuchen nicht laden.`);
          setIsLoading(false);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      }
    }
  };

  useEffect(() => {
    loadSelectionFromSessionStorage();
    fetchData();
  }, [endpoint]);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(item));
  };

  const ItemIcon = Icon;

  const previewSrc =
    selectedItem?.img || "https://placehold.co/600x250/EEEEEE/AAAAAA?text=No+Selection";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 text-gray-900 flex flex-col items-center p-6 pt-8">
      <div className="max-w-6xl w-full">
        <Breadcrumbs />

        {/* NEU: Preview unter Breadcrumbs */}
        <div className="mb-6">
          <div className="relative group w-full bg-white border border-gray-100 rounded-xl overflow-hidden">
            <img
              src={previewSrc}
              alt={selectedItem?.name || "Keine Auswahl"}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://placehold.co/600x250/EEEEEE/AAAAAA?text=No+Image";
              }}
              className="w-full h-[220px] object-contain p-4"
            />

            {/* Hover: Name */}
            <div className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-gray-900/80 text-white text-sm font-semibold px-3 py-2 rounded-lg">
                {selectedItem?.name || "Keine Komponente ausgewählt"}
              </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="bg-blue-100 p-8 rounded-xl flex justify-center items-center text-blue-800">
            <Loader size={24} className="animate-spin mr-3" />
            <p className="text-lg font-medium">Lade Daten...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 p-8 rounded-xl flex flex-col items-center text-red-800 border border-red-300">
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
          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 snap-x snap-mandatory">
            {items.map((item, index) => (
              <div
                key={item[itemIdKey] || `${item.name}-${index}`}
                onClick={() => handleItemSelect(item)}
                className={`
                  bg-white p-5 rounded-lg border-2 transition duration-200 cursor-pointer flex-shrink-0 w-64 snap-start
                  hover:border-blue-500 flex flex-col items-center text-center
                  ${selectedItem && selectedItem[itemIdKey] === item[itemIdKey] ? 'border-blue-600' : 'border-gray-200'}
                `}
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

                <h3 className="font-extrabold text-xl text-gray-900 mb-1 leading-tight">{item.name}</h3>

                <div className="text-sm text-gray-500 mt-1 mb-3">
                  {displayFields.map((field, i) => (
                    <p key={i}>
                      {field.label}: <span className="font-medium text-gray-700">{item[field.key] || 'N/A'}</span>
                    </p>
                  ))}
                </div>

                <div className="mt-auto pt-3 w-full h-10">
                  {selectedItem && selectedItem[itemIdKey] === item[itemIdKey] && (
                    <div className="py-1 px-3 bg-green-500 text-white font-bold rounded-full text-sm flex items-center justify-center">
                      <Check size={16} className="mr-1" /> Ausgewählt
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && items.length === 0 && (
          <div className="bg-yellow-100 p-8 rounded-xl text-yellow-800">
            <p className="text-lg font-medium">Keine Komponenten gefunden. Die API lieferte eine leere Liste.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HardwareConfig;
