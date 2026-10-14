// Google accounts allowed into /admin. Cosmetic gate only: firestore.rules is what enforces
// writes, and must list the same emails (admins.test.ts checks they match).
export const ADMIN_EMAILS = ["jeremyfmn@gmail.com", "polymazemusic@gmail.com"];
