import { toYoutubeEmbedUrl } from "./youtube";

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
