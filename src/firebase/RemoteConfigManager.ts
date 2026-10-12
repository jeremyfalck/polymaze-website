import { RemoteConfig, getRemoteConfig } from "firebase/remote-config";
import { firebaseApp } from "./FirebaseManager";
import { getValue, fetchAndActivate } from "firebase/remote-config";

const INSTAGRAM_URLS_KEY: string = "instagram_posts";
const YOUTUBE_VIDEOS_KEY: string = "youtube_videos";
const CONCERTS_KEY: string = "concerts";

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

const remoteConfig: RemoteConfig = getRemoteConfig(firebaseApp);

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  console.log("development code, setting remote config interval to 1 minute");
  remoteConfig.settings.minimumFetchIntervalMillis = 60000;
} else {
  // production code
}

remoteConfig.defaultConfig = {
  [INSTAGRAM_URLS_KEY]: "[]",
  [YOUTUBE_VIDEOS_KEY]: "[]",
  [CONCERTS_KEY]: "[]",
};

export const getConcerts: () => Promise<Array<ConcertConfig>> = async () => {
  await fetchAndActivate(remoteConfig);
  var concertsValue = getValue(remoteConfig, CONCERTS_KEY).asString();
  var json = JSON.parse(concertsValue);
  let concerts: Array<ConcertConfig> = [];
  if (
    Array.isArray(json) &&
    json.every(
      (item) =>
        typeof item === "object" &&
        "date" in item &&
        "place" in item &&
        "city" in item &&
        "department" in item &&
        "description" in item
    )
  ) {
    concerts = json as Array<ConcertConfig>;
  } else {
    console.log("cannot parse value: ", concertsValue);
  }
  return concerts;
};

export const getInstagramPosts: () => Promise<string[]> = async () => {
  await fetchAndActivate(remoteConfig);
  var instagramPostsValue = getValue(remoteConfig, INSTAGRAM_URLS_KEY);
  const instagramPostsJson = JSON.parse(instagramPostsValue.asString());
  if (instagramPostsJson instanceof Array) {
    return instagramPostsJson;
  } else {
    console.log("cannot parse value: ", instagramPostsJson);
    return [];
  }
};

export const getYoutubeVideos: () => Promise<
  Array<YoutubeVideoConfig>
> = async () => {
  await fetchAndActivate(remoteConfig);
  var youtubeVideosValue = getValue(
    remoteConfig,
    YOUTUBE_VIDEOS_KEY
  ).asString();
  var json = JSON.parse(youtubeVideosValue);
  let youtubeVideos: Array<YoutubeVideoConfig> = [];
  if (
    Array.isArray(json) &&
    json.every(
      (item) => typeof item === "object" && "title" in item && "url" in item
    )
  ) {
    youtubeVideos = json as Array<YoutubeVideoConfig>;
  } else {
    console.log("cannot parse value: ", youtubeVideosValue);
  }
  return youtubeVideos;
};
