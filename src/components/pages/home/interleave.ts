// Alternates items of a and b; the leftovers of the longer list go last.
export const interleave = <T>(a: T[], b: T[]): T[] => {
  const out: T[] = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (i < a.length) out.push(a[i]);
    if (i < b.length) out.push(b[i]);
  }
  return out;
};
