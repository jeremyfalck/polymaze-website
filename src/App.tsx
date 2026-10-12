import React from "react";
import "./App.css";

import { HashRouter, Route, Routes } from "react-router-dom";
import Band from "./components/pages/band/Band";
import Home from "./components/pages/home/Home";
import Concerts from "./components/pages/concerts/Concerts";
import BackToTop from "./components/BackToTop";
import paths from "./constants/paths.json";

function App() {
  return (
    <React.StrictMode>
      <div className="flex flex-col">
        <HashRouter>
          <Routes>
            <Route path={paths.band} element={<Band />} />
            <Route path={paths.projects} element={<Home />} />
            <Route path={paths.concerts} element={<Concerts />} />
          </Routes>
        </HashRouter>
        <BackToTop />
      </div>
    </React.StrictMode>
  );
}

export default App;
