import { RemoteConfig, getRemoteConfig } from "firebase/remote-config";
import { firebaseApp } from "./FirebaseManager";
import { getValue, fetchAndActivate } from "firebase/remote-config";

const INSTAGRAM_URLS_KEY: string = "instagram_posts";
const YOUTUBE_VIDEOS_KEY: string = "youtube_videos";

export interface YoutubeVideoConfig {
  title: string;
  url: string;
}

const remoteConfig: RemoteConfig = getRemoteConfig(firebaseApp);

remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

remoteConfig.defaultConfig = {
  [INSTAGRAM_URLS_KEY]: "[]",
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
