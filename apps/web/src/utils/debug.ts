export const debugObject = (obj: any) =>
  Object.keys(obj)
    .map((p) => `${p.toUpperCase()}: ${obj[p]}`)
    .join("\n");
