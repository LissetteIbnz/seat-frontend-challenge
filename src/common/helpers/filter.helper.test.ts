import { filterByText } from "./filter.helper";

interface Item {
  id: string;
  name: string;
}

describe("common/helpers/filter", () => {
  describe("filterByText", () => {
    const collectionTestCases = [null, undefined, []];

    it.each(collectionTestCases)(
      "should return an empty array when it feeds collection equals %p",
      (testValue) => {
        const collection: Item[] = testValue;
        const text = undefined;
        const fields = undefined;

        const result = filterByText(collection, text, fields);

        expect(result).toEqual([]);
      },
    );

    const fieldsTestCases = [null, undefined, []];
    it.each(fieldsTestCases)(
      "should return same array when it feeds collection with one item, text equals undefined and fields equals undefined",
      (testValue) => {
        const collection: Item[] = [{ id: "1", name: "name 1" }];
        const text = undefined;
        const fields = testValue;

        const result = filterByText(collection, text, fields);

        expect(result).toEqual(collection);
      },
    );

    const textTestCases = [null, undefined, ""];

    it.each(textTestCases)(
      "should return same array when it feeds collection with one item, text equals undefined and fields has id",
      (testValue) => {
        const collection: Item[] = [{ id: "1", name: "name 1" }];
        const text = testValue;

        const result = filterByText(collection, text, ["id"]);

        expect(result).toEqual(collection);
      },
    );

    it('should return same array when it feeds collection with one item and text equals "1" and fields equals id', () => {
      const collection: Item[] = [{ id: "1", name: "name 1" }];
      const text = "1";

      const result = filterByText(collection, text, ["id"]);

      expect(result).toEqual(collection);
    });

    it('should return same array when it feeds collection with one item and text equals "na" and fields equals name', () => {
      const collection: Item[] = [{ id: "1", name: "name 1" }];
      const text = "na";

      const result = filterByText(collection, text, ["name"]);

      expect(result).toEqual(collection);
    });

    it('should return same array when it feeds collection with one item and text equals "1" and fields equals id and name', () => {
      const collection: Item[] = [{ id: "1", name: "name 1" }];
      const text = "1";

      const result = filterByText(collection, text, ["id", "name"]);

      expect(result).toEqual(collection);
    });

    it('should return same array when it feeds collection with one item and text equals "name" and fields equals id and name', () => {
      const collection: Item[] = [{ id: "1", name: "name 1" }];
      const text = "name";

      const result = filterByText(collection, text, ["id", "name"]);

      expect(result).toEqual(collection);
    });
  });

  describe("upper case", () => {
    it('should return first item when it feeds collection with two items, text equals "NAME 1" and fields has name using filterByText', () => {
      const collection: Item[] = [
        { id: "1", name: "name 1" },
        { id: "2", name: "name 2" },
      ];
      const text = "NAME 1";

      const result = filterByText(collection, text, ["name"]);

      expect(result).toEqual([{ id: "1", name: "name 1" }]);
    });
  });

  describe("ignore accents", () => {
    it('should return first item when it feeds collection with two items, text equals "náme 1" and fields has name using filterByText', () => {
      const collection: Item[] = [
        { id: "1", name: "name 1" },
        { id: "2", name: "name 2" },
      ];
      const text = "náme 1";

      const result = filterByText(collection, text, ["name"]);

      expect(result).toEqual([{ id: "1", name: "name 1" }]);
    });
  });
});
