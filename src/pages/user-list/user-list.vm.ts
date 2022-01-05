import { Column } from "react-table";

export type UserID = number;
export type UserTitle = "Mr" | "Mrs" | "Dr" | "Honorable";

export interface User {
  id: UserID;
  fullName: string;
  email: string;
}

type KeysUser = keyof User;

export const FILTERS: KeysUser[] = ["fullName"];

export const HEADERS: Column[] = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Full Name",
    accessor: "fullName",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "",
    accessor: "actions",
    disableSortBy: true,
  },
];
