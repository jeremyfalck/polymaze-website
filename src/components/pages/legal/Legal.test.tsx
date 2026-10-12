import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Legal from "./Legal";

beforeAll(() => {
  (window as any).ResizeObserver = class {
    observe() {}
    disconnect() {}
  };
});

it("shows the publisher identity and host", () => {
  render(
    <MemoryRouter>
      <Legal />
    </MemoryRouter>,
  );
  expect(screen.getByText(/917 611 279/)).toBeInTheDocument();
  expect(screen.getByText(/OVH SAS/)).toBeInTheDocument();
});
