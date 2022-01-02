export type UserID = number;
export type UserTitle = "Mr" | "Mrs" | "Dr";

export interface User {
  id: UserID;
  title: UserTitle;
  firstName: string;
  lastName: string;
  email: string;
}
