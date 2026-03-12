import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout as keycloakLogout } from "../auth/keycloak";
import { User } from "lucide-react";

function readJwtPayload(token) {
  try {
    const base64 = token.split(".")[1];
    if (!base64) return null;
    const normalized = base64.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(normalized)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [summaryReady, setSummaryReady] = useState(false);
  const [username, setUsername] = useState("User");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const linkBaseClass =
    "px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-logoBlue focus:ring-offset-2 focus:ring-offset-gray-900";

  const getLinkClass = ({ isActive }) =>
    isActive
      ? `${linkBaseClass} bg-logoBlueShadow text-white shadow-md`
      : `${linkBaseClass} text-gray-300 hover:text-white hover:bg-gray-800`;

  const readSummaryReady = () => {
    const raw = sessionStorage.getItem("selectedComponent_Storage");
    if (!raw) return false;
    try {
      return !!JSON.parse(raw);
    } catch {
      return false;
    }
  };

  useEffect(() => {
    setSummaryReady(readSummaryReady());
    const onSelectionChanged = () => setSummaryReady(readSummaryReady());
    window.addEventListener("selection-changed", onSelectionChanged);
    return () => window.removeEventListener("selection-changed", onSelectionChanged);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("keycloakToken");
    const payload = token ? readJwtPayload(token) : null;

    const name =
      payload?.preferred_username ||
      payload?.username ||
      payload?.name ||
      payload?.email ||
      null;

    if (name) setUsername(String(name));
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function logout() {
    sessionStorage.clear();
    await keycloakLogout();
    navigate("/login", { replace: true });
  }

  const summaryClass = summaryReady
    ? undefined
    : `${linkBaseClass} text-gray-500 bg-gray-800/40 cursor-not-allowed`;

  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-xl text-white p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex-shrink-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider">
          <span className="text-logoBlue">Computer</span>
          <span className="text-white">Configurator</span>
        </h1>
      </div>

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

      <ul className="hidden md:flex space-x-2 items-center">
        <li><NavLink to="/home" className={getLinkClass}>Home</NavLink></li>
        <li><NavLink to="/about" className={getLinkClass}>About</NavLink></li>

        <li>
          <NavLink
            to="/summary"
            className={({ isActive }) =>
              summaryReady ? getLinkClass({ isActive }) : summaryClass
            }
            onClick={(e) => {
              if (!summaryReady) e.preventDefault();
            }}
            aria-disabled={!summaryReady}
            tabIndex={summaryReady ? 0 : -1}
          >
            Übersicht
          </NavLink>
        </li>

        <li className="relative" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-logoBlue"
            aria-label="User menu"
          >
            <User size={20} />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white text-gray-900 rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
              <div className="px-4 py-3 border-b bg-gray-50">
                <div className="text-xs text-gray-500">Angemeldet als</div>
                <div className="text-sm font-bold truncate">{username}</div>
              </div>

              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
              >
                Abmelden
              </button>
            </div>
          )}
        </li>
      </ul>

      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-gray-900 flex flex-row justify-center p-4 space-x-2 md:hidden">
          <li>
            <NavLink to="/home" className={getLinkClass} onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={getLinkClass} onClick={() => setIsOpen(false)}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/summary"
              className={({ isActive }) =>
                summaryReady ? getLinkClass({ isActive }) : summaryClass
              }
              onClick={(e) => {
                if (!summaryReady) {
                  e.preventDefault();
                  return;
                }
                setIsOpen(false);
              }}
              aria-disabled={!summaryReady}
              tabIndex={summaryReady ? 0 : -1}
            >
              Übersicht
            </NavLink>
          </li>

          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className={`${linkBaseClass} text-red-400 hover:text-white hover:bg-red-600`}
            >
              Abmelden
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
