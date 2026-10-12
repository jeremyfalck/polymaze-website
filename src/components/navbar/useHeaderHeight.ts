import { useCallback, useEffect, useRef, useState } from "react";

// Tracks the height of the element the returned ref is attached to, updating
// whenever it attaches or is resized.
export default function useHeaderHeight() {
  const [height, setHeight] = useState(0);
  const observer = useRef<ResizeObserver>();

  const ref = useCallback((element: HTMLDivElement | null) => {
    observer.current?.disconnect();
    if (!element) return;
    setHeight(element.clientHeight);
    observer.current = new ResizeObserver(() =>
      setHeight(element.clientHeight)
    );
    observer.current.observe(element);
  }, []);

  useEffect(() => () => observer.current?.disconnect(), []);

  return [ref, height] as const;
}
