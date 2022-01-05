export type UserID = string;

export type User = {
  id: UserID;
  firstName: string;
  lastName: string;
  email: string;
};

export const createEmptyUser = (): User => ({
  id: "",
  email: "",
  firstName: "",
  lastName: "",
});
