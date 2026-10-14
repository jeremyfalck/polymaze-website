import { useEffect, useState } from "react";
import { BandHeader } from "./BandHeader";
import { MembersPresentation } from "./MembersPresentation";
import { WhoAreWe } from "./WhoAreWe";
import LegalLink from "../../LegalLink";
import { NavBar } from "../../navbar/Navbar";
import useHeaderHeight from "../../navbar/useHeaderHeight";

export default function Band() {
  const getCurrentDimension = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [dimensions, setDimensions] = useState(getCurrentDimension());
  const [ref, headerHeight] = useHeaderHeight();

  useEffect(() => {
    const onResize = () => setDimensions(getCurrentDimension());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <main className="overscroll-none overflow-hidden">
        <div
          className="mx-auto py-6 sm:px-6 lg:px-8 w-full flex-1 flex-col justify-center absolute top-0 left-0 overscroll-contain overflow-y-auto"
          style={{
            maxHeight: dimensions.height,
            paddingTop: headerHeight,
          }}
        >
          <BandHeader />
          <WhoAreWe />
          <MembersPresentation />
          <LegalLink />
        </div>
        <NavBar index={1} ref={ref} />
      </main>
    </>
  );
}
