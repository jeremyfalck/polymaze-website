import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./header/Navbar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
  },
  {
    path: "/projects",
    element: (
      <>
        <NavBar />
        <div>projects</div>
      </>
    ),
  },
  {
    path: "/team",
    element: (
      <>
        <NavBar />
        <div>team</div>
      </>
    ),
  },
  {
    path: "/contact",
    element: (
      <>
        <NavBar />
        <div>contact</div>
      </>
    ),
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
