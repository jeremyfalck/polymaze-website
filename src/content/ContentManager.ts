import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseManager";
import { toYoutubeEmbedUrl } from "./youtube";

export interface YoutubeVideoConfig {
  title: string;
  url: string;
}

export interface ConcertConfig {
  date: string;
  place: string;
  city: string;
  department: string;
  description: string;
}

// Everything the band edits lives in one Firestore doc, `content/site`; array order is display order.
export interface SiteContent {
  concerts: ConcertConfig[];
  videos: YoutubeVideoConfig[];
  instagram: { url: string }[];
}

const ref = () => doc(db, "content", "site");

// Cached for the page's lifetime; failures are not cached so the next visit retries.
let cache: Promise<Partial<SiteContent>> | null = null;

// Throws on failure (the admin must not mistake an error for an empty list and overwrite it).
export const fetchContent = async (): Promise<Partial<SiteContent>> =>
  ((await getDoc(ref())).data() ?? {}) as Partial<SiteContent>;

export const loadContent = (): Promise<Partial<SiteContent>> => {
  if (!cache) {
    cache = fetchContent()
      .catch((e) => {
        console.log("cannot load site content", e);
        cache = null;
        return {};
      });
  }
  return cache;
};

export const saveContent = async (patch: Partial<SiteContent>) => {
  await setDoc(ref(), patch, { merge: true });
  cache = null;
};

export const getInstagramPosts = async (): Promise<string[]> =>
  ((await loadContent()).instagram ?? []).map((p) => p.url).filter(Boolean);

export const getYoutubeVideos = async (): Promise<YoutubeVideoConfig[]> =>
  ((await loadContent()).videos ?? [])
    .filter((v) => v.url)
    .map((v) => ({ title: v.title, url: toYoutubeEmbedUrl(v.url) }));

export const getConcerts = async (): Promise<ConcertConfig[]> =>
  ((await loadContent()).concerts ?? []).filter(
    (c) => /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(c.date) && c.place
  );
