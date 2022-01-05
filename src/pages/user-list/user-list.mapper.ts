import { mapToCollection } from "common/mappers";
import * as AM from "infra/dto";
import * as VM from "./user-list.vm";

export const mapUserFromApiToVm = (user: AM.UserDTO): VM.User => ({
  id: user.id,
  fullName: [user.first_name, user.last_name].join(" ").trim(),
  email: user.email,
});

export const mapUserListFromApiToVm = (users: AM.UserDTO[]): VM.User[] =>
  mapToCollection(users, mapUserFromApiToVm);
