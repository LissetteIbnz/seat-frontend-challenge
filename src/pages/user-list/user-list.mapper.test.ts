import { mapUserListFromApiToVm } from "./user-list.mapper";
import * as AM from "infra/dto";

describe("pages/user-list/mappers", () => {
  describe("mapUserListFromApiToVm", () => {
    const testCases = [null, undefined, []];
    it.each(testCases)("should return an empty array when passes %p", (testValue) => {
      expect(mapUserListFromApiToVm(testValue)).toEqual([]);
    });

    it("should map a user collection from api to vm", () => {
      const userList: AM.UserDTO[] = [
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          email: "irrelevant@email.com",
        },
      ];

      expect(mapUserListFromApiToVm(userList)).toMatchInlineSnapshot(`
        Array [
          Object {
            "email": "irrelevant@email.com",
            "fullName": "John Doe",
            "id": 1,
          },
        ]
      `);
    });
  });
});
