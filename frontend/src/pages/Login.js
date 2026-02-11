import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../images/Logo_Fertig.png";
import { loginWithPassword } from "../auth/keycloak";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setServerError("");

    const newErrors = {};
    if (!username.trim()) newErrors.username = "Benutzername erforderlich";
    if (!password.trim()) newErrors.password = "Passwort erforderlich";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      await loginWithPassword(username.trim(), password);

      navigate("/home", { replace: true });

      setTimeout(() => {
        if (window.location.pathname === "/login") {
          window.location.replace("/home");
        }
      }, 0);
    } catch (err) {
      setServerError(err?.message || "Login fehlgeschlagen");
    } finally {
      setIsLoading(false);
    }
  }

  const isDisabled = isLoading || !username.trim() || !password.trim();

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

        {serverError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm font-medium">
            <strong>Fehler:</strong> {serverError}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Benutzername"
              className={`w-full rounded-xl border-2 px-4 py-3 outline-none ${
                errors.username ? "border-red-500" : "border-gray-200 focus:border-logoBlue"
              }`}
            />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
          </div>

          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Passwort"
              className={`w-full rounded-xl border-2 px-4 py-3 outline-none ${
                errors.password ? "border-red-500" : "border-gray-200 focus:border-logoBlue"
              }`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full px-6 py-3 font-bold text-white rounded-full shadow-xl transition ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-logoBlueShadow hover:bg-logoBlue-dark hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isLoading ? "Einloggen..." : "Einloggen →"}
          </button>
        </form>
      </div>
    </div>
  );
}
