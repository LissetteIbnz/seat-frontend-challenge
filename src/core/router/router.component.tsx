import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserListScene, UserDetailsScene } from "scenes";
import { routes } from ".";

export const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<UserListScene />} />
        <Route path={routes.users} element={<UserListScene />} />
        <Route path={routes.editUser()} element={<UserDetailsScene />} />
        <Route path={routes.createUser} element={<UserDetailsScene />} />
      </Routes>
    </BrowserRouter>
  );
};
