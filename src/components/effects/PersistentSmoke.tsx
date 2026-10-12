import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Smoke from "./Smoke";
import colors from "../../assets/colors.json";
import paths from "../../constants/paths.json";

const getSize = () => ({ width: window.innerWidth, height: window.innerHeight });

// One smoke for the whole app, mounted once behind the pages so navigating
// doesn't rebuild the WebGL scene. Paused on Home, whose video covers it.
export default function PersistentSmoke() {
  const { pathname } = useLocation();
  const [size, setSize] = useState(getSize());

  useEffect(() => {
    const onResize = () => setSize(getSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Smoke
        smokeOpacity="0.3"
        smokeColor={colors.purple}
        width={size.width}
        height={size.height}
        paused={pathname === paths.projects}
      />
    </div>
  );
}
