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

export const getYoutubeVideos = async (): Promise<YoutubeVideoConfig[]> =>
  (await fetchTab(GIDS.youtube))
    .filter((row) => row.url)
    .map((row) => ({ title: row.title, url: row.url }));
