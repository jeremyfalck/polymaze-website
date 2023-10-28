import {
  createRef,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Smoke from "../../effects/Smoke";
import { BandHeader } from "./BandHeader";
import { MembersPresentation } from "./MembersPresentation";
import { WhoAreWe } from "./WhoAreWe";
import { NavBar } from "../../navbar/Navbar";

export default function Home() {
  const getCurrentDimension = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [dimensions, setDimensions] = useState(getCurrentDimension());
  const [headerHeight, setHeaderHeight] = useState(0);

  const ref = createRef<HTMLDivElement>();

  useLayoutEffect(() => {
    setHeaderHeight(
      ref.current && ref.current.clientHeight ? ref.current.clientHeight : 0
    );
    setDimensions(getCurrentDimension());
  }, []);

  return (
    <>
      <main className="bg-black overscroll-none overflow-hidden">
        <NavBar index={0} ref={ref} />
        <Smoke
          smokeOpacity="0.3"
          smokeColor="#FFFFFF"
          width={dimensions.width}
          height={dimensions.height}
        />
        <div
          className="mx-auto py-6 sm:px-6 lg:px-8 w-full flex-1 flex-col justify-center absolute top-0 left-0 overscroll-contain overflow-y-auto "
          style={{
            marginTop: headerHeight,
            maxHeight: dimensions.height - headerHeight,
          }}
        >
          <BandHeader />
          <WhoAreWe />
          <MembersPresentation />
        </div>
      </main>
    </>
  );
}
