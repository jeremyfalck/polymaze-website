import React from "react";
import "./App.css";

import { HashRouter, Route, Routes } from "react-router-dom";
import Band from "./components/pages/band/Band";
import Projects from "./components/pages/projects/Projects";
import Concerts from "./components/pages/concerts/Concerts";
import paths from "./constants/paths.json";

function App() {
  return (
    <React.StrictMode>
      <div className="flex flex-col">
        <HashRouter>
          <Routes>
            <Route path={paths.band} element={<Band />} />
            <Route path={paths.projects} element={<Projects />} />
            <Route path={paths.concerts} element={<Concerts />} />
          </Routes>
        </HashRouter>
      </div>
    </React.StrictMode>
  );
}

export default App;
