import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { getErrorMessage } from "common/helpers";
import { routes } from "core/router";
import { UserDetailsComponent } from "./user-details.component";
import { isValidId, getUserById, createUser } from "./user-details.service";
import { createEmptyUser, User } from "./user-details.vm";

export const UserDetailsContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast({
    position: "top-right",
  });

  const [user, setUser] = React.useState<User>(createEmptyUser());
  const [isEditMode, setIsEditMode] = React.useState(false);

  const onLoadUser = async (id: string) => {
    try {
      const vmUser = await getUserById(id);
      setUser(vmUser);
    } catch (error) {
      const message = getErrorMessage(error);
      toast({
        description: message,
        status: "error",
      });
    }
  };

  React.useEffect(() => {
    const isValid = isValidId(id);
    setIsEditMode(isValid);
    if (isValid) {
      onLoadUser(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (newUser: User) => {
    try {
      await createUser(newUser);
      toast({
        description: "User created successfully",
        status: "success",
      });
      goBack();
    } catch (error) {
      toast({
        description: getErrorMessage(error),
        status: "error",
      });
    }
  };

  const goBack = () => {
    navigate(routes.users);
  };

  return (
    <UserDetailsComponent
      user={user}
      isEditMode={isEditMode}
      onCancel={goBack}
      onSave={handleSave}
    />
  );
};
