import { mapToCollection } from "./collection.mapper";

describe("common/mappers", () => {
  describe("mapToCollection", () => {
    const testCases: any[][] = [null, undefined, []];
    it.each(testCases)("should return an empty array when passes %p", (testValue) => {
      const mapItemFn = (item: any) => item;
      const result = mapToCollection(testValue as any, mapItemFn);
      expect(result).toEqual([]);
    });

    it("should map a collection to a new collection", () => {
      const collection = [1, 2, 3];
      const result = mapToCollection(collection, (item) => item + 1);
      expect(result).toEqual([2, 3, 4]);
    });
  });
});
