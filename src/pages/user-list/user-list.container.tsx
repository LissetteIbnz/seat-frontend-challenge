import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { routes } from "core/router";
import { getErrorMessage } from "common/helpers";
import { UserListComponent } from "./user-list.component";
import { User } from "./user-list.vm";
import { deleteUser, getAllUsers } from "./user-list.service";

// TODO: Pending to implement an error handler and loader component (handle no results found flow).
export const UserListContainer = () => {
  const navigate = useNavigate();
  const toast = useToast({
    position: "top-right",
  });

  const [users, setUsers] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const onLoadUsers = async () => {
    setIsLoading(true);
    try {
      const usersList = await getAllUsers();
      setUsers(usersList);
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        description: message,
        status: "error",
      });
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    onLoadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id.toString() !== userId));
      toast({
        description: "User deleted successfully",
        status: "success",
      });
    } catch (error) {
      toast({
        description: getErrorMessage(error),
        status: "error",
      });
    }
  };

  const handleCreate = () => {
    navigate(routes.createUser);
  };

  const handleEdit = (id: string) => {
    navigate(routes.editUser(id));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserListComponent
      onCreate={handleCreate}
      onDelete={handleDelete}
      onEdit={handleEdit}
      users={users}
    />
  );
};
