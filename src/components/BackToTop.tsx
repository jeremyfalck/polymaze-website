import { useEffect, useRef, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

const THRESHOLD = 400;

// Pages scroll inside their own overflow container, not the window, and scroll
// events don't bubble, so listen in the capture phase and remember the scroller.
const BackToTop = () => {
  const scroller = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = (e: Event) => {
      const el = e.target instanceof HTMLElement ? e.target : null;
      if (!el) return;
      scroller.current = el;
      setVisible(el.scrollTop > THRESHOLD);
    };
    // A new page starts at the top without firing a scroll event.
    const onRoute = () => {
      scroller.current = null;
      setVisible(false);
    };
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("hashchange", onRoute);
    return () => {
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("hashchange", onRoute);
    };
  }, []);

  const goTop = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    scroller.current?.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="Retour en haut"
      onClick={goTop}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 sm:right-10 z-50 rounded-full p-3 text-white bg-white/10 backdrop-blur-md border border-[#c9a5e340] hover:bg-white/20 hover:border-[#c9a5e3] focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all duration-200 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUpIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
