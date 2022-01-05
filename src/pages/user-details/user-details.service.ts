import { DEFAULT_USER_ID } from "common/models";
import { userRepository } from "infra/repositories";
import { mapUserFromApiToVm, mapUserFromVmToApi } from "./user-details.mapper";
import * as VM from "./user-details.vm";

export const getUserById = async (userId: string): Promise<VM.User> => {
  const apiUser = await userRepository.getById(userId);
  const vmUser = mapUserFromApiToVm(apiUser);
  return vmUser;
};

export const createUser = async (user: VM.User): Promise<VM.User> => {
  const mapUser = mapUserFromVmToApi(user);
  const apiUser = await userRepository.create(mapUser);
  const vmUser = mapUserFromApiToVm(apiUser);
  return vmUser;
};

export const isValidId = (id: string): boolean => {
  return id !== DEFAULT_USER_ID && Boolean(id);
};
