import { isUndefinedOrNull } from "common/helpers";
import * as AM from "infra/dto";
import * as VM from "./user-details.vm";

export const mapUserFromApiToVm = (user: AM.UserDTO): VM.User =>
  isUndefinedOrNull(user)
    ? VM.createEmptyUser()
    : {
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        id: user.id.toString(),
      };

export const mapUserFromVmToApi = (user: VM.User): AM.UserDTO => ({
  email: user.email,
  first_name: user.firstName,
  last_name: user.lastName,
  id: parseInt(user.id),
});
