import * as React from "react";
import { userService } from "services";
import { getErrorMessage } from "helpers";
import { UsersComponent } from "./users.component";
import type { User } from "core/model";

export const UsersContainer = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return <UsersComponent error={error} loading={isLoading} users={users} />;
};
