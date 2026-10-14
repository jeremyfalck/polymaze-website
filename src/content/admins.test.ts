import { readFileSync } from "fs";
import { join } from "path";
import { ADMIN_EMAILS } from "./admins";

test("admin emails match firestore.rules", () => {
  const rules = readFileSync(join(process.cwd(), "firestore.rules"), "utf8");
  const listed = (rules.match(/"[^"]+@[^"]+"/g) ?? []).map((e) => e.slice(1, -1));
  expect([...listed].sort()).toEqual([...ADMIN_EMAILS].sort());
});
