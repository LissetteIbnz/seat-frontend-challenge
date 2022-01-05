import { createEmptyUser } from "./user-details.vm";

describe("pages/user-details/vm", () => {
  describe("createEmptyUser", () => {
    it("should return an empty user", () => {
      expect(createEmptyUser()).toMatchInlineSnapshot(`
        Object {
          "email": "",
          "firstName": "",
          "id": "",
          "lastName": "",
        }
      `);
    });
  });
});
