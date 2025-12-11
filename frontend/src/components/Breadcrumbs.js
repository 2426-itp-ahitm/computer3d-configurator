import { Link, useLocation } from "react-router-dom";
import { CONFIG_STEPS } from "./steps";
import { Check } from "lucide-react";

export default function Breadcrumbs() {
    const location = useLocation();
    const currentIndex = CONFIG_STEPS.findIndex(
        step => step.path === location.pathname
    );

    return (
        // *** NEU: Responsiver Container ***
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center text-sm mb-8 w-full bg-gray-100 px-4 py-2 rounded-xl"> 

            {CONFIG_STEPS.map((step, index) => {
                const isCompleted = index < currentIndex;
                const isActive = index === currentIndex;

                // *** NEU: Responsives Element-Div ***
                return (
                    <div key={step.path} className="flex items-center w-full md:w-auto mb-1 md:mb-0">
                        
                        <Link
                            to={step.path}
                            className={`
                                // NEU: Link füllt auf Mobil die Breite aus
                                px-3 py-1 rounded-full w-full md:w-auto text-left md:text-center
                                transition cursor-pointer select-none
                                flex items-center space-x-1 
                                
                                ${isActive ? "bg-[#0073b9] text-white font-bold" : ""}
                                ${isCompleted ? "bg-blue-100 text-blue-800" : ""}
                                ${index > currentIndex ? "bg-gray-200 text-gray-600" : ""}
                            `}
                        >
                            {isCompleted && <Check size={16} />}
                            
                            <span>{step.label}</span>
                        </Link>

                        {/* NEU: Das Trennzeichen wird nur auf großen Bildschirmen angezeigt */}
                        {index < CONFIG_STEPS.length - 1 && (
                            <span className="hidden md:block text-gray-400">›</span>
                        )}
                    </div>
                );
            })}

        </div>
    );
}