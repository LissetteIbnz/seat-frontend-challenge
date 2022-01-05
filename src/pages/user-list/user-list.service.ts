import { userRepository } from "infra/repositories";
import { mapUserListFromApiToVm } from "./user-list.mapper";
import * as VM from "./user-list.vm";

export const getAllUsers = async (): Promise<VM.User[]> => {
  const apiUsersList = await userRepository.getAll();
  const vmUsersList = mapUserListFromApiToVm(apiUsersList);
  return vmUsersList;
};

export const deleteUser = async (id: string): Promise<void> => {
  await userRepository.delete(id);
};
