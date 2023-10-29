import React from "react";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Projects from "./components/pages/projects/Projects";
import Team from "./components/pages/team/Team";
import Contact from "./components/pages/contact/Contact";
import paths from "./constants/paths.json";

const router = createBrowserRouter([
  {
    path: paths.root,
    element: <Home />,
  },
  {
    path: paths.projects,
    element: <Projects />,
  },
  {
    path: paths.team,
    element: <Team />,
  },
  {
    path: paths.contact,
    element: <Contact />,
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
