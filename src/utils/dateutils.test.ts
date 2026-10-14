import { fromIsoDate, toIsoDate } from "./dateutils";

test("toIsoDate and fromIsoDate round-trip dd/mm/yyyy", () => {
  expect(toIsoDate("5/3/2025")).toBe("2025-03-05");
  expect(fromIsoDate("2025-03-05")).toBe("05/03/2025");
  expect(toIsoDate("nope")).toBe("");
  expect(fromIsoDate("")).toBe("");
});
