import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";

import {
  CaseConfig,
  CPUConfig,
  MotherboardConfig,
  GPUConfig,
  RAMConfig,
  CoolingConfig,
  PSUConfig,
  StorageConfig,
} from "./configuration/Components";
import { Summary } from "./configuration/Summary";

const FLOW = [
  { path: "/case-config", requiresKey: null },
  { path: "/cpu-config", requiresKey: "selectedComponent_Case" },
  { path: "/motherboard-config", requiresKey: "selectedComponent_CPU" },
  { path: "/gpu-config", requiresKey: "selectedComponent_Mainboard" },
  { path: "/ram-config", requiresKey: "selectedComponent_GPU" },
  { path: "/cooling-config", requiresKey: "selectedComponent_RAM" },
  { path: "/psu-config", requiresKey: "selectedComponent_Cooler" },
  { path: "/storage-config", requiresKey: "selectedComponent_PSU" },
  { path: "/summary", requiresKey: "selectedComponent_Storage" },
];

function hasSelection(key) {
  if (!key) return true;
  const raw = sessionStorage.getItem(key);
  if (!raw) return false;
  try {
    return !!JSON.parse(raw);
  } catch {
    return false;
  }
}

function firstAllowedPath() {
  for (const step of FLOW) {
    if (!hasSelection(step.requiresKey)) {
      const idx = FLOW.findIndex((s) => s.path === step.path);
      return idx <= 0 ? "/case-config" : FLOW[idx - 1].path;
    }
  }
  return "/summary";
}

function isAuthed() {
  const token = localStorage.getItem("keycloakToken");
  return !!token && token !== "null" && token !== "undefined" && token !== "";
}

function RouteGuard({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;

    if (path === "/login" && isAuthed()) {
      navigate("/home", { replace: true });
      return;
    }

    if (path === "/login") return;

    if (!isAuthed()) {
      navigate("/login", { replace: true });
      return;
    }

    const current = FLOW.find((s) => s.path === path);
    if (!current) return;

    if (!hasSelection(current.requiresKey)) {
      const target = firstAllowedPath();
      if (target !== path) navigate(target, { replace: true });
    }
  }, [location.pathname, navigate]);

  return children;
}

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

function AppRoutes() {
  return (
    <RouteGuard>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<Login />} />

          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/case-config" element={<CaseConfig />} />
          <Route path="/cpu-config" element={<CPUConfig />} />
          <Route path="/motherboard-config" element={<MotherboardConfig />} />
          <Route path="/gpu-config" element={<GPUConfig />} />
          <Route path="/ram-config" element={<RAMConfig />} />
          <Route path="/cooling-config" element={<CoolingConfig />} />
          <Route path="/psu-config" element={<PSUConfig />} />
          <Route path="/storage-config" element={<StorageConfig />} />
          <Route path="/summary" element={<Summary />} />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Layout>
    </RouteGuard>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
