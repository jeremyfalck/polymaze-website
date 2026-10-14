import type { Ref } from "react";
import Collage from "../../../assets/images/polymaze_collage.png";
import PolymazeLogoWhite from "../../../assets/images/polymaze_logo.png";

const buttonClass =
  "px-6 py-3 rounded-md font-semibold text-white transition-colors";

export const HeroBackground = ({
  scrimRef,
}: {
  scrimRef: Ref<HTMLDivElement>;
}) => (
  <div
    className="fixed inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${Collage})` }}
  >
    {/* Poster only with reduced motion. */}
    <video
      className="hidden motion-safe:block absolute inset-0 w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src={`${process.env.PUBLIC_URL}/hero.webm`} type="video/webm" />
      <source src={`${process.env.PUBLIC_URL}/hero.mp4`} type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/40" />
    <div ref={scrimRef} className="absolute inset-0 bg-black opacity-0" />
  </div>
);

export const Hero = ({ headerHeight }: { headerHeight: number }) => (
  <section
    className="relative w-full"
    style={{ height: `calc(100vh - ${headerHeight}px)`, minHeight: 480 }}
  >
    <div className="relative h-full flex flex-col items-center justify-center gap-6 px-6 text-center">
      <img
        className="w-8/12 sm:w-4/12"
        alt="Polymaze"
        src={PolymazeLogoWhite}
      />
      <p className="text-white text-2xl sm:text-3xl font-semibold tracking-tight">
        Nouveau single : Take your hand
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          className={`${buttonClass} bg-[rgba(201,165,227,0.35)] backdrop-blur-md backdrop-saturate-150 border border-[rgba(201,165,227,0.6)] hover:bg-[rgba(201,165,227,0.5)]`}
          href="https://open.spotify.com/album/3aLOe8ePJqIUMqUgNziMcV"
          target="_blank"
          rel="noreferrer noopener"
        >
          Écouter
        </a>
        <a
          className={`${buttonClass} bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20`}
          href="#/concerts"
        >
          Concerts
        </a>
      </div>
    </div>
  </section>
);
