import { useEffect, useRef, useState } from "react";

const TOP = 64; // navbar height (h-16)
const MARGIN = 6;
const MIN_THUMB = 48;
const IDLE_MS = 1500;

interface Thumb {
  visible: boolean;
  top: number;
  height: number;
}

// Overlay scrollbar drawn by us, because native ones can't be styled the same in
// every browser. Pages scroll inside their own container and scroll events don't
// bubble, so (like BackToTop) it listens in the capture phase to find the scroller.
const CustomScrollbar = () => {
  const scroller = useRef<HTMLElement | null>(null);
  const idleTimer = useRef<number>();
  const dragging = useRef(false);
  const hovering = useRef(false);
  const [thumb, setThumb] = useState<Thumb>({
    visible: false,
    top: 0,
    height: MIN_THUMB,
  });

  const trackHeight = () => window.innerHeight - TOP - MARGIN;

  const update = () => {
    const el = scroller.current;
    if (!el || el.scrollHeight <= el.clientHeight) {
      setThumb((t) => ({ ...t, visible: false }));
      return;
    }
    const track = trackHeight();
    const height = Math.max(
      MIN_THUMB,
      (track * el.clientHeight) / el.scrollHeight,
    );
    const range = el.scrollHeight - el.clientHeight;
    const top = (el.scrollTop / range) * (track - height);
    setThumb({ visible: true, top, height });
  };

  const scheduleHide = () => {
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => {
      if (!dragging.current && !hovering.current) {
        setThumb((t) => ({ ...t, visible: false }));
      }
    }, IDLE_MS);
  };

  useEffect(() => {
    const onScroll = (e: Event) => {
      if (!(e.target instanceof HTMLElement)) return;
      scroller.current = e.target;
      update();
      scheduleHide();
    };
    const onRoute = () => {
      scroller.current = null;
      setThumb((t) => ({ ...t, visible: false }));
    };
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", onRoute);
    return () => {
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", onRoute);
      window.clearTimeout(idleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el) return;
    e.preventDefault();
    dragging.current = true;
    const startY = e.clientY;
    const startScroll = el.scrollTop;
    const ratio =
      (el.scrollHeight - el.clientHeight) / (trackHeight() - thumb.height);
    const onMove = (m: PointerEvent) => {
      el.scrollTop = startScroll + (m.clientY - startY) * ratio;
    };
    const onUp = () => {
      dragging.current = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      scheduleHide();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <div
      aria-hidden="true"
      className="fixed right-1 z-40 w-3 pointer-events-none"
      style={{ top: TOP, bottom: MARGIN }}
    >
      <div
        data-testid="scroll-thumb"
        onPointerDown={onPointerDown}
        onMouseEnter={() => {
          hovering.current = true;
          window.clearTimeout(idleTimer.current);
        }}
        onMouseLeave={() => {
          hovering.current = false;
          scheduleHide();
        }}
        className={`absolute right-0 w-2 hover:w-3 rounded-full cursor-grab active:cursor-grabbing transition-[opacity,width] duration-200 ${
          thumb.visible ? "opacity-100 pointer-events-auto" : "opacity-0"
        }`}
        style={{
          top: thumb.top,
          height: thumb.height,
          background:
            "linear-gradient(180deg, #e6cdf7 0%, #c9a5e3 45%, #8a5cc7 100%)",
          boxShadow: "0 0 12px rgba(201,165,227,0.55)",
        }}
      />
    </div>
  );
};

export default CustomScrollbar;
