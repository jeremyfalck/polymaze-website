import { render, screen, act } from "@testing-library/react";
import CustomScrollbar from "./CustomScrollbar";

const scrollable = (
  scrollHeight: number,
  clientHeight: number,
  top: number,
) => {
  const el = document.createElement("div");
  Object.defineProperty(el, "scrollHeight", { value: scrollHeight });
  Object.defineProperty(el, "clientHeight", { value: clientHeight });
  el.scrollTop = top;
  document.body.appendChild(el);
  return el;
};

describe("CustomScrollbar", () => {
  it("shows a thumb sized to the visible fraction when content overflows", () => {
    render(<CustomScrollbar />);
    const thumb = screen.getByTestId("scroll-thumb");
    expect(thumb.className).toContain("opacity-0");

    const el = scrollable(2000, 500, 0);
    act(() => {
      el.dispatchEvent(new Event("scroll"));
    });
    expect(thumb.className).toContain("opacity-100");
    expect(thumb.style.top).toBe("0px");
    expect(parseFloat(thumb.style.height)).toBeGreaterThanOrEqual(48);
  });

  it("stays hidden when the content does not overflow", () => {
    render(<CustomScrollbar />);
    const el = scrollable(400, 500, 0);
    act(() => {
      el.dispatchEvent(new Event("scroll"));
    });
    expect(screen.getByTestId("scroll-thumb").className).toContain("opacity-0");
  });
});
