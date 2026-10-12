import { useEffect, useRef, useState } from "react";
import { Paper } from "@mui/material";
import { InstagramEmbed } from "react-social-media-embed";
import {
  getInstagramPosts,
  getYoutubeVideos,
} from "../../../sheets/SheetsManager";
import { interleave } from "./interleave";

type WallItem =
  | { kind: "instagram"; url: string }
  | { kind: "youtube"; title: string; url: string };

const FIRST_BATCH = 6;

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
      { rootMargin: "200px" }
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

const Card = ({ children }: { children: React.ReactNode }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      color: "white",
      backgroundColor: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(6px)",
      border: "1px solid rgba(201,165,227,0.25)",
      borderRadius: 3,
      overflow: "hidden",
    }}
  >
    {children}
  </Paper>
);

export default function SocialWall() {
  const [items, setItems] = useState<WallItem[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    Promise.all([getInstagramPosts(), getYoutubeVideos()]).then(
      ([posts, videos]) =>
        setItems(
          interleave<WallItem>(
            posts.map((url) => ({ kind: "instagram", url })),
            videos.map((v) => ({ kind: "youtube", ...v }))
          )
        )
    );
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
      <p className="text-white text-3xl font-semibold tracking-tight pb-6">
        Nos derniers posts
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, showAll ? undefined : FIRST_BATCH).map((item) => (
          <Card key={`${item.kind}-${item.url}`}>
            {item.kind === "youtube" ? (
              <>
                <p className="text-white text-lg font-semibold pb-3">
                  {item.title}
                </p>
                <iframe
                  className="w-full rounded-lg"
                  style={{ aspectRatio: "16/9" }}
                  src={item.url}
                  title={item.title || "YouTube video player"}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </>
            ) : (
              <LazyMount>
                <InstagramEmbed url={item.url} width="100%" />
              </LazyMount>
            )}
          </Card>
        ))}
      </div>
      {items.length > FIRST_BATCH && !showAll && (
        <div className="flex justify-center pt-6">
          <button
            className="px-6 py-3 rounded-md font-semibold text-white bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 transition-colors"
            onClick={() => setShowAll(true)}
          >
            Voir plus
          </button>
        </div>
      )}
    </section>
  );
}
