// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../images/Logo_Fertig.png";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    sessionStorage.setItem("isAuthed", "true");
    navigate("/home", { replace: true });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-white text-gray-900 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md bg-white/80 backdrop-blur rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8">
        <div className="mb-6 text-center">
          <img
            src={logoImage}
            alt="Computer3DConfigurator Logo"
            className="w-24 mx-auto mix-blend-multiply"
          />
          <h1 className="mt-4 text-3xl font-extrabold">
            <span className="text-logoBlue">Login</span>
          </h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Benutzername"
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-logoBlue outline-none"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Passwort"
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-logoBlue outline-none"
          />

          <button
            type="submit"
            className="w-full px-6 py-3 font-bold text-white bg-logoBlueShadow rounded-full shadow-xl hover:bg-logoBlue-dark transition"
          >
            Einloggen →
          </button>
        </form>
      </div>
    </div>
  );
}
