import React, { createRef, useLayoutEffect, useState } from "react";
import { NavBar } from "../../navbar/Navbar";
import Smoke from "../../effects/Smoke";
import { BandHeader } from "../band/BandHeader";
import { WhoAreWe } from "../band/WhoAreWe";
import { MembersPresentation } from "../band/MembersPresentation";

export default function Projects() {
  const ref = createRef<HTMLDivElement>();

  const getCurrentDimension = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [headerHeight, setHeaderHeight] = useState(0);
  const [dimensions, setDimensions] = useState(getCurrentDimension());

  useLayoutEffect(() => {
    setHeaderHeight(
      ref.current && ref.current.clientHeight ? ref.current.clientHeight : 0
    );
    setDimensions(getCurrentDimension());
  }, []);

  return (
    <>
      <main className="bg-black overscroll-none overflow-hidden">
        <Smoke
          smokeOpacity="0.3"
          smokeColor="#FFFFFF"
          width={dimensions.width}
          height={dimensions.height - headerHeight}
        />
        <div
          className="w-full mx-auto py-6 sm:px-6 lg:px-8 flex-1 flex-col justify-center absolute top-0 left-0 overscroll-contain overflow-y-auto"
          style={{
            maxHeight: dimensions.height,
            paddingTop: headerHeight,
          }}
        >
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1">
              <p className="text-white order-first text-3xl font-semibold tracking-tight p-6 sm:p-0 sm:py-6">
                Nouveau single: Take your hand
              </p>
              <iframe
                className="w-full lg:w-3/4 rounded-lg mx-auto sm:mx-0 sm:text-5xl px-6 sm:px-0 "
                height={152}
                src="https://open.spotify.com/embed/album/3aLOe8ePJqIUMqUgNziMcV?utm_source=generator"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                allowFullScreen
              />

              <p className="text-white order-first text-3xl font-semibold tracking-tight p-6 sm:p-0 sm:py-6">
                Notre EP : Another Step
              </p>
              <iframe
                className="w-full lg:w-3/4 rounded-lg mx-auto sm:text-5xl sm:mx-0 px-6 sm:px-0"
                src="https://open.spotify.com/embed/album/5auF6rrW1uOUA1VJpTESz1?utm_source=generator"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
            <div className="flex-1 sm:px-6">
              <p className="text-white order-first text-3xl font-semibold tracking-tight p-6 sm:p-0 sm:py-6">
                Live au Nadir
              </p>
              <iframe
                className="w-full lg:w-3/4 rounded-lg mx-auto sm:mx-0 px-6 sm:px-0"
                style={{ aspectRatio: "16/9" }}
                src="https://www.youtube.com/embed/nqe7BnNznPY?si=XJ7Pudh0rGLM7GAg"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <p className="text-white order-first text-3xl font-semibold tracking-tight p-6 sm:p-0 sm:py-6">
                Live dans notre salon: Fondation
              </p>
              <iframe
                className="w-full lg:w-3/4 rounded-lg mx-auto sm:mx-0 px-6 sm:px-0"
                style={{ aspectRatio: "16/9" }}
                src="https://www.youtube.com/embed/777ITCO7BSA?si=kyZamaVvm18iFmrq"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
        <NavBar index={0} ref={ref} />
      </main>
    </>
  );
}
