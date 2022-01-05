import { validateForm } from "./user-details.validations";
import { User } from "./user-details.vm";

describe("pages/user-details/validations", () => {
  describe("validateForm", () => {
    const invalidCases = [null, undefined];

    it.each(invalidCases)("fields are required when passes %p", (testValue) => {
      expect(validateForm(testValue)).toEqual({
        email: "Email is required",
        firstName: "First Name is required",
        lastName: "Last Name is required",
      });
    });

    it("email is invalid", () => {
      const form: User = {
        email: "invalid",
        firstName: "John",
        lastName: "Doe",
        id: "1",
      };

      expect(validateForm(form)).toEqual({
        email: "Invalid email address",
      });
    });

    it("email is valid", () => {
      const form: User = {
        email: "valid@gmail.com",
        firstName: "John",
        lastName: "Doe",
        id: "1",
      };

      expect(validateForm(form)).toEqual({});
    });
  });
});
