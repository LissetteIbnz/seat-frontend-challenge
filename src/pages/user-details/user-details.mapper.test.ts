import { mapUserFromApiToVm, mapUserFromVmToApi } from "./user-details.mapper";
import { User } from "./user-details.vm";

describe("pages/user-details/mappers", () => {
  describe("mapUserFromApiToVm", () => {
    const invalidCases = [null, undefined];

    it("should map an API model to VM model", () => {
      const apiUser = {
        email: "irrelevant@email.com",
        first_name: "John",
        last_name: "Doe",
        id: 1,
      };

      expect(mapUserFromApiToVm(apiUser)).toMatchInlineSnapshot(`
        Object {
          "email": "irrelevant@email.com",
          "firstName": "John",
          "id": "1",
          "lastName": "Doe",
        }
      `);
    });

    it.each(invalidCases)("should return an empty user when passed object is %p", (testValue) => {
      expect(mapUserFromApiToVm(testValue)).toMatchInlineSnapshot(`
        Object {
          "email": "",
          "firstName": "",
          "id": "",
          "lastName": "",
        }
      `);
    });
  });

  describe("mapUserFromVmToApi", () => {
    it("should map a VM model to API model", () => {
      const vmUser: User = {
        email: "irrelevant@email.com",
        firstName: "John",
        id: "1",
        lastName: "Doe",
      };

      expect(mapUserFromVmToApi(vmUser)).toMatchInlineSnapshot(`
        Object {
          "email": "irrelevant@email.com",
          "first_name": "John",
          "id": 1,
          "last_name": "Doe",
        }
      `);
    });
  });
});
