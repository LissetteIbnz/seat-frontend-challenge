import { render, screen, fireEvent } from "test-utils";
import { UserRowComponent } from "./user-row.component";

type Props = React.ComponentProps<typeof UserRowComponent>;

const renderWithTable = (props: Props) => {
  return render(
    <table>
      <tbody>
        <UserRowComponent {...props} />
      </tbody>
    </table>,
  );
};

describe("pages/user-list/components/UserRowComponent", () => {
  let props: Props;

  beforeEach(() => {
    props = {
      row: {
        id: 1,
        fullName: "John Doe",
        email: "irrelevant",
      },
      onEdit: jest.fn(),
      onDelete: jest.fn(),
    };
  });

  it("should render correctly", () => {
    const { container } = renderWithTable(props);

    expect(container).toMatchSnapshot();
  });

  it("should call onEdit when a user clicks on edit button", () => {
    renderWithTable(props);

    const editButton = screen.getByLabelText("Edit");
    fireEvent.click(editButton);

    expect(props.onEdit).toHaveBeenCalledTimes(1);
  });

  it("should call onDelete when a user clicks on delete button", () => {
    renderWithTable(props);

    const deleteButton = screen.getByLabelText("Delete");
    fireEvent.click(deleteButton);

    expect(props.onDelete).toHaveBeenCalledTimes(1);
    expect(props.onDelete).toHaveBeenCalledWith({
      id: props.row.id.toString(),
      name: props.row.fullName,
    });
  });
});
