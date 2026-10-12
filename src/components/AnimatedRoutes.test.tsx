import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";

const GoTo = ({ to }: { to: string }) => {
  const navigate = useNavigate();
  return <button onClick={() => navigate(to)}>go</button>;
};

test("wrapper remounts on navigation so the animation replays", () => {
  const { container, getByText } = render(
    <MemoryRouter initialEntries={["/a"]}>
      <GoTo to="/b" />
      <AnimatedRoutes>
        <Routes>
          <Route path="/a" element={<p>a</p>} />
          <Route path="/b" element={<p>b</p>} />
        </Routes>
      </AnimatedRoutes>
    </MemoryRouter>
  );
  const before = container.querySelector(".page-enter");
  fireEvent.click(getByText("go"));
  const after = container.querySelector(".page-enter");
  expect(after).not.toBe(before);
  expect(after).toHaveTextContent("b");
});
