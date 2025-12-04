import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
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
  StorageConfig
} from "./configuration/Components";
import { Summary } from "./configuration/Summary";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
    </Router>
  );
}

export default App;
