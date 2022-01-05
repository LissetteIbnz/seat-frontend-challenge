import { User } from "./user-details.vm";

export const validateForm = (form: User): Partial<Record<keyof User, string>> => {
  const errors: Partial<Record<keyof User, string>> = {};

  if (!form?.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
    errors.email = "Invalid email address";
  }

  if (!form?.firstName) {
    errors.firstName = "First Name is required";
  }

  if (!form?.lastName) {
    errors.lastName = "Last Name is required";
  }

  return errors;
};
