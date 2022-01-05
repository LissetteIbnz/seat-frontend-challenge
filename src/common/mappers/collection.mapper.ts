export const mapToCollection = <T, R, C>(
  collection: T[],
  mapItemFn: (item: T, ...args: C[]) => R,
  ...args: C[]
): R[] => (Array.isArray(collection) ? collection.map((item) => mapItemFn(item, ...args)) : []);
