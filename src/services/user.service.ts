import { environment } from "core/environment";
import { apiClient } from "core/api";
import type { User } from "core/model";

interface UserService {
  getAll: () => Promise<User[]>;
}

const baseUrl = `${environment.apiUrl}/users`;

export const userService: UserService = {
  getAll: async () => {
    return apiClient.get(baseUrl);
  },
};
