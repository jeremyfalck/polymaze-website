import { createRef, useEffect, useLayoutEffect, useState } from "react";
import { NavBar } from "../../navbar/Navbar";
import { InstagramEmbed } from "react-social-media-embed";
import Smoke from "../../effects/Smoke";
import colors from "../../../assets/colors.json";
import {
  YoutubeVideoConfig,
  getInstagramPosts,
  getYoutubeVideos,
} from "../../../firebase/RemoteConfigManager";
import YoutubeVideo from "./YoutubeVideo";

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

  const [instagramPosts, setInstagramPosts] = useState<string[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<YoutubeVideoConfig[]>([]);

  useLayoutEffect(() => {
    setHeaderHeight(
      ref.current && ref.current.clientHeight ? ref.current.clientHeight : 0
    );
    setDimensions(getCurrentDimension());
  }, []);

  useEffect(() => {
    getInstagramPosts().then((posts) => setInstagramPosts(posts));
    getYoutubeVideos().then((videos) =>
      setYoutubeVideos(
        videos.map((video) => ({ title: video.title, url: video.url }))
      )
    );
  }, []);

  return (
    <>
      <main className="bg-black overscroll-none overflow-hidden">
        <Smoke
          smokeOpacity="0.3"
          smokeColor={colors.purple}
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
            <div className="flex-1 sm:px-6">
              <p className="text-white order-first text-3xl font-semibold tracking-tight p-6 sm:p-0 sm:py-6">
                Nouveau single: Take your hand
              </p>
              <iframe
                title="Take your hand"
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
                title="Another Step"
                className="w-full lg:w-3/4 rounded-lg mx-auto sm:text-5xl sm:mx-0 px-6 sm:px-0"
                src="https://open.spotify.com/embed/album/5auF6rrW1uOUA1VJpTESz1?utm_source=generator"
                height="352"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>

            <div className="flex-1 sm:px-6">
              <p className="text-white order-first text-3xl font-semibold tracking-tight p-6 sm:p-0 sm:py-6">
                Nos derniers posts
              </p>

              <div className="w-full lg:w-3/4 rounded-lg mx-auto sm:mx-0 sm:text-5xl px-6 sm:px-0">
                {instagramPosts.map((post, index) => {
                  var className = "";
                  if (index !== 0) {
                    className = "lg:hidden";
                  }
                  return (
                    <InstagramEmbed
                      className={className}
                      key={post}
                      url={post}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex-1 sm:px-6">
              {youtubeVideos.map((video) => (
                <YoutubeVideo
                  title={video.title}
                  url={video.url}
                  key={video.url}
                />
              ))}
            </div>
          </div>
        </div>
        <NavBar index={0} ref={ref} />
      </main>
    </>
  );
}
