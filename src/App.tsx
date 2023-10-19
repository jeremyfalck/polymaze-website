import React from "react";
import "./App.css";
import NavBar from "./components/navbar/Navbar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Projects from "./components/pages/projects/Projects";
import Team from "./components/pages/team/Team";
import Contact from "./components/pages/contact/Contact";
import paths from "./constants/paths.json";

const router = createBrowserRouter([
  {
    path: paths.root,
    element: (
      <>
        <NavBar index={0} />
        <Home />
      </>
    ),
  },
  {
    path: paths.projects,
    element: (
      <>
        <NavBar index={1} />
        <Projects />
      </>
    ),
  },
  {
    path: paths.team,
    element: (
      <>
        <NavBar index={2} />
        <Team />
      </>
    ),
  },
  {
    path: paths.contact,
    element: (
      <>
        <NavBar index={3} />
        <Contact />
      </>
    ),
  },
]);

function App() {
  return (
    <React.StrictMode>
      <div className="flex flex-col">
        <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  );
}

export default App;
