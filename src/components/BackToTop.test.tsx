import { render, screen, fireEvent, act } from "@testing-library/react";
import BackToTop from "./BackToTop";

it("shows after scrolling an element and scrolls it back to top", () => {
  const scroller = document.createElement("div");
  scroller.scrollTo = jest.fn() as any;
  document.body.appendChild(scroller);
  render(<BackToTop />);
  const button = screen.getByRole("button", { hidden: true });
  expect(button.className).toContain("opacity-0");

  act(() => {
    scroller.scrollTop = 500;
    scroller.dispatchEvent(new Event("scroll"));
  });
  expect(button.className).toContain("opacity-100");

  window.matchMedia = (() => ({ matches: false })) as any;
  fireEvent.click(button);
  expect(scroller.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
});
