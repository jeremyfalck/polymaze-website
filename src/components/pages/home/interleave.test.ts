import { interleave } from "./interleave";

describe("interleave", () => {
  it("alternates a and b", () => {
    expect(interleave([1, 2, 3], [10, 20, 30])).toEqual([1, 10, 2, 20, 3, 30]);
  });
  it("appends leftovers of the longer list", () => {
    expect(interleave([1], [10, 20, 30])).toEqual([1, 10, 20, 30]);
    expect(interleave([1, 2, 3], [10])).toEqual([1, 10, 2, 3]);
  });
  it("handles empty inputs", () => {
    expect(interleave([], [])).toEqual([]);
    expect(interleave([1, 2], [])).toEqual([1, 2]);
    expect(interleave([], [1, 2])).toEqual([1, 2]);
  });
});
