import { ReactNode, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Routes, useLocation } from "react-router-dom";

type Doc = { startViewTransition?: (update: () => void) => unknown };

// Renders the route tree one navigation behind the router and swaps it inside a
// View Transition (styled in App.css). Browsers without the API swap instantly.
const AnimatedRoutes = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [shown, setShown] = useState(location);

  useEffect(() => {
    // Not location.key: hash-link navigations in HashRouter all keep key "default".
    if (location.pathname === shown.pathname) return;
    const swap = () => flushSync(() => setShown(location));
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const start = (document as Doc).startViewTransition;
    if (start && !reduce) start.call(document, swap);
    else swap();
  }, [location, shown]);

  return <Routes location={shown}>{children}</Routes>;
};

export default AnimatedRoutes;
