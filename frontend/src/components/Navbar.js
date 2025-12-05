import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const linkBaseClass =
        "px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-logoBlue focus:ring-offset-2 focus:ring-offset-gray-900";

    const getLinkClass = ({ isActive }) =>
        isActive
            ? `${linkBaseClass} bg-logoBlueShadow text-white shadow-md shadow-logoBlue/50`
            : `${linkBaseClass} text-gray-300 hover:text-white hover:bg-gray-800`;

    return (
        <nav className="bg-gray-900 border-b border-gray-800 shadow-xl text-white p-4 flex justify-between items-center sticky top-0 z-10">
            <div className="flex-shrink-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider">
                    <span className="text-logoBlue">Computer</span>
                    <span className="text-white">3DConfigurator</span>
                </h1>
            </div>

            {/* Hamburger für kleine Screens */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-300 hover:text-white focus:outline-none"
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Links für große Screens */}
            <ul className="hidden md:flex space-x-2">
                <li><NavLink to="/" className={getLinkClass}>Home</NavLink></li>
                <li><NavLink to="/about" className={getLinkClass}>About</NavLink></li>
            </ul>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="absolute top-full left-0 w-full bg-gray-900 flex flex-row justify-center p-4 space-x-2 md:hidden">
                    <li>
                        <NavLink to="/" className={getLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={getLinkClass} onClick={() => setIsOpen(false)}>About</NavLink>
                    </li>
                </ul>
            )}
        </nav>
    );
}
