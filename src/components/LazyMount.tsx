import { ReactNode, useEffect, useRef, useState } from "react";

// Mounts children only once the placeholder nears the viewport (embeds are heavy).
const LazyMount = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={visible ? "" : "min-h-[300px]"}>
      {visible && children}
    </div>
  );
};

export default LazyMount;
