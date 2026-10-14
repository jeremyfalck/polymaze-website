// Accepts watch / youtu.be / shorts / embed links (also the broken embed/watch?v=) and
// returns the iframe embed URL. Anything unrecognised is returned unchanged.
// ponytail: drops playlist/start-time params, keep them if the band needs it
export const toYoutubeEmbedUrl = (url: string): string => {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^(www|m)\./, "");
    let id: string | null = null;
    if (host === "youtu.be") {
      id = u.pathname.split("/")[1];
    } else if (host === "youtube.com") {
      id =
        u.searchParams.get("v") ??
        /^\/(?:embed|shorts)\/([^/]+)$/.exec(u.pathname)?.[1] ??
        null;
    }
    return id ? `https://www.youtube.com/embed/${id}` : url;
  } catch {
    return url;
  }
};
