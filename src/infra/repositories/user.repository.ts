import { environment } from "core/environment";
import { apiClient } from "core/api";
import { UserDTO } from "infra/dto";

interface UserRepository {
  getAll: () => Promise<UserDTO[]>;
  getById: (id: string) => Promise<UserDTO>;
  delete: (id: string) => Promise<void>;
  create: (user: UserDTO) => Promise<UserDTO>;
}

const baseUrl = `${environment.apiUrl}/users`;

export const userRepository: UserRepository = {
  getAll: async () => {
    return apiClient.get(baseUrl);
  },
  getById: async (id: string) => {
    return apiClient.get(`${baseUrl}/${id}`);
  },
  delete: async (id) => {
    return apiClient.delete(`${baseUrl}/${id}`);
  },
  create: async (user) => {
    return apiClient.post(baseUrl, user);
  },
};
