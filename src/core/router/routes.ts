import { OmitOwn } from "common/helpers";
import { generatePath } from "react-router-dom";

const ROUTES = ["root", "users", "createUser", "editUser"] as const;
type BaseRoutes = Record<typeof ROUTES[number], string>;

const baseRoutes: BaseRoutes = {
  root: "/",
  users: "/users",
  createUser: "/create-user",
  editUser: "/users/:id",
};

interface Routes extends OmitOwn<BaseRoutes, "editUser"> {
  editUser: (id?: string) => string;
}

export const routes: Routes = {
  ...baseRoutes,
  editUser: (id) => (id ? generatePath(baseRoutes.editUser, { id }) : baseRoutes.editUser),
};
