import { ease } from "./SmoothScroll";

describe("ease", () => {
  it("moves toward the target without overshooting", () => {
    const next = ease(0, 100, 1000 / 60);
    expect(next).toBeGreaterThan(0);
    expect(next).toBeLessThan(100);
  });
  it("is frame-rate independent", () => {
    const oneStep = ease(0, 100, 1000 / 30);
    const twoSteps = ease(ease(0, 100, 1000 / 60), 100, 1000 / 60);
    expect(oneStep).toBeCloseTo(twoSteps, 5);
  });
  it("converges", () => {
    let v = 0;
    for (let i = 0; i < 200; i++) v = ease(v, 500, 1000 / 60);
    expect(v).toBeCloseTo(500, 1);
  });
});
