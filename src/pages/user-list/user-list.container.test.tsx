import { toast } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "test-utils";
import { UserListContainer } from "./user-list.container";
import * as UserService from "./user-list.service";

const mockedUseNavigate = jest.fn();

jest.mock("./user-list.service");
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: () => mockedUseNavigate,
  };
});

const renderWithRouter = () => {
  return render(
    <MemoryRouter>
      <UserListContainer />
    </MemoryRouter>,
  );
};

describe("pages/user-list/UserListContainer", () => {
  // 👇 Close all toasts before each tests and wait for them to be removed.
  beforeEach(() => {
    toast.closeAll();
    document.getElementById("chakra-toast-portal")?.remove();
  });

  it("should render correctly", async () => {
    jest.spyOn(UserService, "getAllUsers").mockResolvedValueOnce([]);

    const { container } = renderWithRouter();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });

  it("should render the UserListComponent", async () => {
    jest.spyOn(UserService, "getAllUsers").mockResolvedValueOnce([
      {
        id: 1,
        fullName: "John Doe",
        email: "irrelevant",
      },
    ]);

    renderWithRouter();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  it("should handle to create a user", async () => {
    jest.spyOn(UserService, "getAllUsers").mockResolvedValueOnce([]);

    renderWithRouter();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const createButton = screen.getByRole("button", { name: /new user/i });
    fireEvent.click(createButton);

    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
  });

  it("should handle to edit a user", async () => {
    jest.spyOn(UserService, "getAllUsers").mockResolvedValueOnce([
      {
        id: 1,
        fullName: "John Doe",
        email: "irrelevant",
      },
    ]);

    renderWithRouter();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
  });

  it("should handle to delete a user", async () => {
    jest.spyOn(UserService, "getAllUsers").mockResolvedValueOnce([
      {
        id: 1,
        fullName: "John Doe",
        email: "irrelevant",
      },
    ]);

    jest.spyOn(UserService, "deleteUser").mockResolvedValueOnce();

    renderWithRouter();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText(/User deleted successfully/i)).toBeInTheDocument();
    });
  });

  it("should handle to cancel delete a user", async () => {
    jest.spyOn(UserService, "getAllUsers").mockResolvedValueOnce([
      {
        id: 1,
        fullName: "John Doe",
        email: "irrelevant",
      },
    ]);

    const spyDeleteUser = jest.spyOn(UserService, "deleteUser").mockResolvedValueOnce();

    renderWithRouter();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(spyDeleteUser).not.toHaveBeenCalled();
  });
});
