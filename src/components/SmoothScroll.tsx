import { useEffect } from "react";

// Fraction of the remaining distance covered per 60 Hz frame; lower = floatier.
const LERP = 0.1;
const FRAME_MS = 1000 / 60;

// Moves current toward target, independent of the frame rate.
export const ease = (current: number, target: number, dtMs: number) =>
  current + (target - current) * (1 - Math.pow(1 - LERP, dtMs / FRAME_MS));

const scrollableAncestor = (start: EventTarget | null): HTMLElement | null => {
  let el = start instanceof HTMLElement ? start : null;
  while (el && el !== document.body) {
    const overflowY = getComputedStyle(el).overflowY;
    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight
    ) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
};

// Eases mouse-wheel scrolling inside the pages' own scroll containers. Touch,
// keyboard, scrollbar drags and iframes (wheel never reaches us there) stay native.
const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let el: HTMLElement | null = null;
    let target = 0;
    // scrollTop is rounded to whole pixels, so ease from our own float position.
    let pos = 0;
    let raf = 0;
    let last = 0;

    const tick = (now: number) => {
      if (!el) return;
      pos = ease(pos, target, now - last);
      last = now;
      if (Math.abs(target - pos) < 0.5) {
        el.scrollTop = target;
        raf = 0;
        return;
      }
      el.scrollTop = pos;
      raf = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const scroller = scrollableAncestor(e.target);
      if (!scroller) return;
      e.preventDefault();

      if (scroller !== el || !raf) {
        el = scroller;
        pos = target = scroller.scrollTop;
      }
      const delta =
        e.deltaMode === 1
          ? e.deltaY * 40
          : e.deltaMode === 2
            ? e.deltaY * scroller.clientHeight
            : e.deltaY;
      const max = scroller.scrollHeight - scroller.clientHeight;
      target = Math.min(max, Math.max(0, target + delta));
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
};

export default SmoothScroll;
