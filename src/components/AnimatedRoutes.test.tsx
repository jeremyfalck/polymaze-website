import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter, Route, useNavigate } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";

const GoTo = ({ to }: { to: string }) => {
  const navigate = useNavigate();
  return <button onClick={() => navigate(to)}>go</button>;
};

const setup = () =>
  render(
    <MemoryRouter initialEntries={["/a"]}>
      <GoTo to="/b" />
      <AnimatedRoutes>
        <Route path="/a" element={<p>a</p>} />
        <Route path="/b" element={<p>b</p>} />
      </AnimatedRoutes>
    </MemoryRouter>
  );

afterEach(() => {
  delete (document as any).startViewTransition;
});

test("swaps the page inside a view transition when supported", () => {
  const start = jest.fn((update: () => void) => update());
  (document as any).startViewTransition = start;
  const { getByText, queryByText } = setup();

  fireEvent.click(getByText("go"));

  expect(start).toHaveBeenCalledTimes(1);
  expect(getByText("b")).toBeInTheDocument();
  expect(queryByText("a")).toBeNull();
});

test("swaps instantly when the API is missing", () => {
  const { getByText } = setup();
  fireEvent.click(getByText("go"));
  expect(getByText("b")).toBeInTheDocument();
});
