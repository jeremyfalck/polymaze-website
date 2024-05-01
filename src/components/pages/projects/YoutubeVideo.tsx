interface YoutubeVideoProps {
  title: string;
  url: string;
}

const YoutubeVideo = ({ title, url }: YoutubeVideoProps) => (
  <>
    <p className="text-white order-first text-3xl font-semibold tracking-tight p-6 sm:p-0 sm:py-6">
      {title}
    </p>
    <iframe
      className="w-full lg:w-3/4 rounded-lg mx-auto sm:mx-0 px-6 sm:px-0"
      style={{ aspectRatio: "16/9" }}
      src={url}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  </>
);

export default YoutubeVideo;
