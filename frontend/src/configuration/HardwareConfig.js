import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
    Cpu, LayoutList, HardDrive, MemoryStick, Snowflake, Power, Disc,
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

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                const response = await fetch(`http://localhost:8080${endpoint}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

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
        fetchData();
    }, [endpoint]);

    const handleItemSelect = (item) => {
        setSelectedItem(item);
    };

    const handleNextStep = () => {
        if (selectedItem) {
            console.log(`Ausgewähltes Element (${title}) gespeichert:`, selectedItem.name);
            navigate(nextPath);
        }
    };

    const handlePreviousStep = () => {
        navigate(prevPath);
    };

    const ItemIcon = Icon;

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 text-gray-900 flex flex-col items-center p-8 pt-16">

            <div className="max-w-6xl w-full">
                <Breadcrumbs />
                <div className="mb-10 p-4 bg-white rounded-xl flex justify-between items-center border border-gray-100">
                    <div className="flex items-center">
                        {selectedItem ? (
                            <div className="text-green-600 font-bold flex items-center">
                                <Check size={20} className="mr-2" />
                                <span className="mr-2">Gewählt:</span>
                                <span className="text-gray-900 font-extrabold">{selectedItem.name}</span>
                            </div>
                        ) : (
                            <div className="text-yellow-600 font-semibold flex items-center">
                                <XCircle size={20} className="mr-2" />
                                Keine Komponente ausgewählt
                            </div>
                        )}
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={handlePreviousStep}
                            className={`
                                px-3 py-1 text-sm font-bold rounded-full transform transition duration-300 flex items-center
                                bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-[1.03]
                            `}
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Zurück
                        </button>

                        <button
                            onClick={handleNextStep}
                            disabled={!selectedItem}
                            className={`
                                px-3 py-1 text-sm font-bold rounded-full transform transition duration-300 flex items-center
                                ${selectedItem
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.03]'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }
                            `}
                        >
                            Weiter
                            <ArrowRight size={20} className="ml-2" />
                        </button>
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
                    ${selectedItem && selectedItem[itemIdKey] === item[itemIdKey]
                                        ? 'border-blue-600'
                                        : 'border-gray-200'
                                    }
                `}
                            >
                                <img
                                    src={item.img || "https://placehold.co/150x150/EEEEEE/AAAAAA?text=No+Image"}
                                    alt={item.name}
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/EEEEEE/AAAAAA?text=No+Image" }}
                                    className="w-full h-auto max-h-[160px] object-contain rounded-md mb-4 group-hover:scale-[1.05] transition-transform duration-300"
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