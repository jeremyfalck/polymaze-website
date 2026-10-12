import type { YoutubeVideoConfig } from "../firebase/RemoteConfigManager";

const BASE_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQf1AzFwx46osZhKNAbyZKpgzgtcBr2iZfh0ggf1KMAyx6Igr4QyVPCBFIloRO7WCnHxvIcoN4g9H6P/pub";

export const GIDS = {
  instagram: "0",
  youtube: "2012695307",
  concerts: "1390539612",
};

// Parses CSV text; the first row is the header. Rows with only empty cells are dropped.
export const parseCsv = (text: string): Record<string, string>[] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  const endField = () => {
    row.push(field);
    field = "";
  };
  const endRow = () => {
    endField();
    if (row.some((cell) => cell.trim() !== "")) rows.push(row);
    row = [];
  };

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        quoted = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      endField();
    } else if (c === "\n") {
      endRow();
    } else if (c !== "\r") {
      field += c;
    }
  }
  endRow();

  const [header, ...data] = rows;
  if (!header) return [];
  return data.map((cells) =>
    Object.fromEntries(
      header.map((name, i) => [name.trim(), (cells[i] ?? "").trim()])
    )
  );
};

export const fetchTab = async (
  gid: string
): Promise<Record<string, string>[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}?gid=${gid}&single=true&output=csv`
    );
    if (!response.ok) {
      console.log("cannot fetch sheet tab", gid, response.status);
      return [];
    }
    return parseCsv(await response.text());
  } catch (e) {
    console.log("cannot fetch sheet tab", gid, e);
    return [];
  }
};

export const getInstagramPosts = async (): Promise<string[]> =>
  (await fetchTab(GIDS.instagram)).map((row) => row.url).filter(Boolean);

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

export const getYoutubeVideos = async (): Promise<YoutubeVideoConfig[]> =>
  (await fetchTab(GIDS.youtube))
    .filter((row) => row.url)
    .map((row) => ({ title: row.title, url: toYoutubeEmbedUrl(row.url) }));
