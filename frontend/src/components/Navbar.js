import React from "react";
import { NavLink } from "react-router-dom";
export default function Navbar() {
    const linkBaseClass =
        "px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-logoBlue focus:ring-offset-2 focus:ring-offset-gray-900";

    const getLinkClass = ({ isActive }) =>
        isActive
            ? `${linkBaseClass} bg-logoBlueShadow text-white shadow-md shadow-logoBlue/50`
            : `${linkBaseClass} text-gray-300 hover:text-white hover:bg-gray-800`;

    return (
        <nav className="bg-gray-900 border-b border-gray-800 shadow-xl text-white p-4 flex justify-between items-center sticky top-0 z-10">
            <div className="flex-shrink-0">
                <h1 className="text-2xl font-extrabold tracking-wider">
                    <span className="text-logoBlue">Computer</span>
                    <span className="text-white">3DConfigurator</span>
                </h1>
            </div>

            <ul className="flex space-x-2">
                <li><NavLink to="/" className={getLinkClass}>Home</NavLink></li>
                <li><NavLink to="/about" className={getLinkClass}>About</NavLink></li>
            </ul>
        </nav>
    );
}
