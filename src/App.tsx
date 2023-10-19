import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navbar/Navbar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Projects from "./components/pages/projects/Projects";
import Team from "./components/pages/team/Team";
import Contact from "./components/pages/contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar index={0} />
        <Home />
      </>
    ),
  },
  {
    path: "/projects",
    element: (
      <>
        <NavBar index={1} />
        <Projects />
      </>
    ),
  },
  {
    path: "/team",
    element: (
      <>
        <NavBar index={2} />
        <Team />
      </>
    ),
  },
  {
    path: "/contact",
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
