import { waitFor } from "@testing-library/react";
import { render, screen, changeInput, fireEvent } from "test-utils";
import { UserDetailsComponent } from "./user-details.component";

type Props = React.ComponentProps<typeof UserDetailsComponent>;

describe("pages/user-details/UserDetailsComponent", () => {
  let props: Props;

  beforeEach(() => {
    props = {
      user: {
        email: "",
        firstName: "",
        lastName: "",
        id: "",
      },
      isEditMode: false,
      onCancel: jest.fn(),
      onSave: jest.fn(),
    };
  });

  it("should render correctly", () => {
    const { container } = render(<UserDetailsComponent {...props} />);
    expect(container).toMatchSnapshot();
  });

  describe("given isEditMode is false", () => {
    beforeEach(() => {
      props.isEditMode = true;
    });

    it("should call onSave", async () => {
      render(<UserDetailsComponent {...props} />);

      const submitButton = screen.getByRole("button", { name: /submit/i });
      expect(props.onSave).toHaveBeenCalledTimes(0);

      const firstNameInput = screen.getByLabelText<HTMLInputElement>(/first name/i);
      const lastNameInput = screen.getByLabelText<HTMLInputElement>(/last name/i);
      const emailInput = screen.getByLabelText<HTMLInputElement>(/email/i);

      changeInput(firstNameInput, "John");
      changeInput(lastNameInput, "Doe");
      changeInput(emailInput, "wrong-email");

      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);

      changeInput(emailInput, "valid-email@email.com");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(props.onSave).toHaveBeenCalledTimes(1);
      });
    });

    it("should call onCancel", async () => {
      render(<UserDetailsComponent {...props} />);

      const cancelButton = screen.getByRole("button", { name: /cancel/i });
      expect(props.onCancel).toHaveBeenCalledTimes(0);

      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(props.onCancel).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("given isEditMode is true", () => {
    beforeEach(() => {
      props.isEditMode = true;
      props.user = {
        email: "irrelevant@email.com",
        firstName: "John",
        lastName: "Doe",
        id: "irrelevant-id",
      };
    });

    it("should call onSave with new changes", async () => {
      render(<UserDetailsComponent {...props} />);

      const submitButton = screen.getByRole("button", { name: /submit/i });
      expect(props.onSave).toHaveBeenCalledTimes(0);

      const firstNameInput = screen.getByLabelText<HTMLInputElement>(/first name/i);
      const lastNameInput = screen.getByLabelText<HTMLInputElement>(/last name/i);
      const emailInput = screen.getByLabelText<HTMLInputElement>(/email/i);

      changeInput(firstNameInput, "Updated John");
      changeInput(lastNameInput, "Updated Doe");
      changeInput(emailInput, "update-email@email.com");

      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(props.onSave).toHaveBeenCalledWith(
          expect.objectContaining({
            email: "update-email@email.com",
            firstName: "Updated John",
            lastName: "Updated Doe",
          }),
        );
      });
    });
  });
});
