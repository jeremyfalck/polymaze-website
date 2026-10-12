import { useEffect, useRef, useState } from "react";
import { Paper } from "@mui/material";
import { InstagramEmbed } from "react-social-media-embed";
import {
  getInstagramPosts,
  getYoutubeVideos,
  YoutubeVideoConfig,
} from "../../../sheets/SheetsManager";

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

const Card = ({
  children,
  flush = false,
}: {
  children: React.ReactNode;
  flush?: boolean;
}) => (
  <Paper
    elevation={0}
    sx={{
      // Instagram embeds need >=326px; flush keeps them unclipped on phones.
      p: flush ? { xs: 0, sm: 2 } : 2,
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

const grid = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start";
const subheading = "text-white text-xl font-semibold pb-4";

export default function SocialWall() {
  const [posts, setPosts] = useState<string[]>([]);
  const [videos, setVideos] = useState<YoutubeVideoConfig[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getInstagramPosts().then(setPosts);
    getYoutubeVideos().then(setVideos);
  }, []);

  if (posts.length === 0 && videos.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <p className="text-white text-3xl font-semibold tracking-tight pb-6">
        Nos derniers posts
      </p>
      {videos.length > 0 && (
        <>
          <p className={subheading}>Vidéos</p>
          <div className={`${grid} pb-10`}>
            {videos.map((video, i) => (
              <Card key={`${video.url}-${i}`}>
                {video.title && (
                  <p className="text-white text-lg font-semibold pb-3">
                    {video.title}
                  </p>
                )}
                <iframe
                  className="w-full rounded-lg"
                  style={{ aspectRatio: "16/9" }}
                  src={video.url}
                  title={video.title || "YouTube video player"}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </Card>
            ))}
          </div>
        </>
      )}
      {posts.length > 0 && (
        <>
          <p className={subheading}>Instagram</p>
          <div className={grid}>
            {posts.slice(0, showAll ? undefined : FIRST_BATCH).map((url, i) => (
              <Card key={`${url}-${i}`} flush>
                <LazyMount>
                  <InstagramEmbed url={url} width="100%" />
                </LazyMount>
              </Card>
            ))}
          </div>
          {posts.length > FIRST_BATCH && !showAll && (
            <div className="flex justify-center pt-6">
              <button
                className="px-6 py-3 rounded-md font-semibold text-white bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 transition-colors"
                onClick={() => setShowAll(true)}
              >
                Voir plus
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
