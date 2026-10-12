import React from "react";
import "./App.css";

import { HashRouter, Route } from "react-router-dom";
import Band from "./components/pages/band/Band";
import Home from "./components/pages/home/Home";
import Concerts from "./components/pages/concerts/Concerts";
import BackToTop from "./components/BackToTop";
import CustomScrollbar from "./components/CustomScrollbar";
import SmoothScroll from "./components/SmoothScroll";
import PersistentSmoke from "./components/effects/PersistentSmoke";
import AnimatedRoutes from "./components/AnimatedRoutes";
import paths from "./constants/paths.json";

function App() {
  return (
    <React.StrictMode>
      <div className="flex flex-col">
        <HashRouter>
          <PersistentSmoke />
          <AnimatedRoutes>
            <Route path={paths.band} element={<Band />} />
            <Route path={paths.projects} element={<Home />} />
            <Route path={paths.concerts} element={<Concerts />} />
          </AnimatedRoutes>
        </HashRouter>
        <BackToTop />
        <CustomScrollbar />
        <SmoothScroll />
      </div>
    </React.StrictMode>
  );
}

export default App;
