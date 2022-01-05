import { isValidId } from "./user-details.service";

describe("pages/user-details/service", () => {
  describe("isValidId", () => {
    const invalidCases = [null, undefined, "0", ""];

    it.each(invalidCases)("should return false when passed id is %p", (testValue) => {
      expect(isValidId(testValue)).toBeFalsy();
    });

    it("should return true when passed id is valid", () => {
      expect(isValidId("1")).toBeTruthy();
    });
  });
});
