import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

// Remounts on every route change so the CSS enter animation replays.
const AnimatedRoutes = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
};

export default AnimatedRoutes;
