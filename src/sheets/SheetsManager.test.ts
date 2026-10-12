import {
  fetchTab,
  getInstagramPosts,
  getYoutubeVideos,
  parseCsv,
  toYoutubeEmbedUrl,
} from "./SheetsManager";

describe("parseCsv", () => {
  it("handles CRLF and no trailing newline", () => {
    expect(parseCsv("url\r\na\r\nb")).toEqual([{ url: "a" }, { url: "b" }]);
  });
  it("handles quoted commas and doubled quotes", () => {
    expect(parseCsv('title,url\n"Live, ""acoustic""",http://x')).toEqual([
      { title: 'Live, "acoustic"', url: "http://x" },
    ]);
  });
  it("skips blank rows and header-only input", () => {
    expect(parseCsv("url\n\n,\na\n")).toEqual([{ url: "a" }]);
    expect(parseCsv("url\n")).toEqual([]);
  });
});

describe("fetchTab", () => {
  afterEach(() => {
    delete (global as any).fetch;
  });
  it("returns [] on network error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("down"));
    expect(await fetchTab("0")).toEqual([]);
  });
  it("returns [] on HTTP error", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });
    expect(await fetchTab("0")).toEqual([]);
  });
  it("parses the tab and requests it by gid", async () => {
    const f = jest
      .fn()
      .mockResolvedValue({ ok: true, text: async () => "url\na" });
    global.fetch = f;
    expect(await fetchTab("0")).toEqual([{ url: "a" }]);
    expect(f.mock.calls[0][0]).toContain("gid=0&single=true&output=csv");
  });
});

describe("content getters", () => {
  const csvByGid: Record<string, string> = {
    "0": "url\nhttps://i/1\n\nhttps://i/2",
    "2012695307":
      "title,url\nT,https://youtu.be/abc\nNoUrl,",
  };
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(async (url: string) => ({
      ok: true,
      text: async () => csvByGid[/gid=(\d+)/.exec(url)![1]],
    }));
  });
  afterEach(() => {
    delete (global as any).fetch;
  });

  it("getInstagramPosts returns urls in sheet order", async () => {
    expect(await getInstagramPosts()).toEqual(["https://i/1", "https://i/2"]);
  });
  it("getYoutubeVideos drops rows with empty url", async () => {
    expect(await getYoutubeVideos()).toEqual([
      { title: "T", url: "https://www.youtube.com/embed/abc" },
    ]);
  });
  it("both resolve [] when fetch rejects", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("down"));
    expect(await getInstagramPosts()).toEqual([]);
    expect(await getYoutubeVideos()).toEqual([]);
  });
});

describe("toYoutubeEmbedUrl", () => {
  const embed = "https://www.youtube.com/embed/kvWPXNdRN9k";
  it.each([
    "https://www.youtube.com/watch?v=kvWPXNdRN9k&list=PL1&index=4",
    "https://youtu.be/kvWPXNdRN9k?si=abc",
    "https://www.youtube.com/embed/watch?v=kvWPXNdRN9k&list=PL1",
    "https://www.youtube.com/embed/kvWPXNdRN9k",
    "https://www.youtube.com/shorts/kvWPXNdRN9k",
    "https://m.youtube.com/watch?v=kvWPXNdRN9k",
  ])("converts %s", (url) => {
    expect(toYoutubeEmbedUrl(url)).toBe(embed);
  });
  it("returns unrecognised input unchanged", () => {
    expect(toYoutubeEmbedUrl("not a url")).toBe("not a url");
    expect(toYoutubeEmbedUrl("https://vimeo.com/123")).toBe(
      "https://vimeo.com/123"
    );
  });
});
