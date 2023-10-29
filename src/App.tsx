import React from "react";
import "./App.css";

import {
  createBrowserRouter,
  createHashRouter,
  HashRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./components/pages/home/Home";
import Projects from "./components/pages/projects/Projects";
import Team from "./components/pages/team/Team";
import Contact from "./components/pages/contact/Contact";
import paths from "./constants/paths.json";

function App() {
  return (
    <React.StrictMode>
      <div className="flex flex-col">
        <HashRouter>
          <Routes>
            <Route path={paths.root} element={<Home />} />
            <Route path={paths.projects} element={<Projects />} />
            <Route path={paths.team} element={<Team />} />
            <Route path={paths.contact} element={<Contact />} />
          </Routes>
        </HashRouter>
      </div>
    </React.StrictMode>
  );
}

export default App;
