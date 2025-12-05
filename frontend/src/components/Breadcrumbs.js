import { Link, useLocation } from "react-router-dom";
import { CONFIG_STEPS } from "./steps";
import { Check } from "lucide-react";

export default function Breadcrumbs() {
    const location = useLocation();
    const currentIndex = CONFIG_STEPS.findIndex(
        step => step.path === location.pathname
    );

    return (
        <div className="flex space-x-3 text-sm mb-8 flex-wrap">

            {CONFIG_STEPS.map((step, index) => {
                const isCompleted = index < currentIndex;
                const isActive = index === currentIndex;

                return (
                    <div key={step.path} className="flex items-center">
                        
                        <Link
                            to={step.path} /*isCompleted ? step.path : "#"*/
                            className={`
                                px-3 py-1 rounded-full
                                transition cursor-pointer select-none
                                flex items-center space-x-1
                                ${isActive ? "bg-blue-600 text-white font-bold" : ""}
                                ${isCompleted ? "bg-green-200 text-green-800" : ""}
                                ${index > currentIndex ? "bg-gray-200 text-gray-600" : ""}
                            `}
                        >
                            {isCompleted}
                            <span>{step.label}</span>
                        </Link>

                        {index < CONFIG_STEPS.length - 1 && (
                            <span className="mx-2 text-gray-400">›</span>
                        )}
                    </div>
                );
            })}

        </div>
    );
}
