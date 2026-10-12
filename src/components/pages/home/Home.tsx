import { useEffect, useState } from "react";
import Smoke from "../../effects/Smoke";
import { NavBar } from "../../navbar/Navbar";
import useHeaderHeight from "../../navbar/useHeaderHeight";
import colors from "../../../assets/colors.json";
import { Hero } from "./Hero";

const headingClass =
  "text-white text-3xl font-semibold tracking-tight p-6 sm:p-0 sm:py-6";
const spotifyAllow =
  "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";

export default function Home() {
  const getCurrentDimension = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [dimensions, setDimensions] = useState(getCurrentDimension());
  const [ref, headerHeight] = useHeaderHeight();

  useEffect(() => {
    const onResize = () => setDimensions(getCurrentDimension());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <main className="bg-black overscroll-none overflow-hidden">
      <Smoke
        smokeOpacity="0.3"
        smokeColor={colors.purple}
        width={dimensions.width}
        height={dimensions.height}
      />
      <div
        className="w-full absolute top-0 left-0 overscroll-contain overflow-y-auto"
        style={{ maxHeight: dimensions.height, paddingTop: headerHeight }}
      >
        <Hero headerHeight={headerHeight} />
        <section className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
          <div>
            <p className={headingClass}>Nouveau single: Take your hand</p>
            <iframe
              title="Take your hand"
              className="w-full rounded-lg px-6 sm:px-0"
              height={152}
              src="https://open.spotify.com/embed/album/3aLOe8ePJqIUMqUgNziMcV?utm_source=generator"
              allow={spotifyAllow}
              loading="lazy"
              allowFullScreen
            />
          </div>
          <div>
            <p className={headingClass}>Notre EP : Another Step</p>
            <iframe
              title="Another Step"
              className="w-full rounded-lg px-6 sm:px-0"
              height={352}
              src="https://open.spotify.com/embed/album/5auF6rrW1uOUA1VJpTESz1?utm_source=generator"
              allow={spotifyAllow}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </section>
      </div>
      <NavBar index={0} ref={ref} />
    </main>
  );
}
