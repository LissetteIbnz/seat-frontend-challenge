import { HeaderGroup } from "react-table";
import { render, screen } from "test-utils";
import { HeaderComponent } from "./header.component";

const renderWithTable = (props) => {
  return render(
    <table>
      <HeaderComponent {...props} />
    </table>,
  );
};

describe("common/components/table/HeaderComponent", () => {
  it("should be rendered as expected passing required properties", () => {
    const props = {
      headerGroups: [
        {
          getHeaderGroupProps: jest.fn(),
          headers: [
            {
              getHeaderProps: jest.fn(),
              getSortByToggleProps: jest.fn(),
              render: jest.fn().mockReturnValue("Test label"),
            },
          ],
        },
      ] as unknown as HeaderGroup[],
    };

    renderWithTable(props);

    expect(screen.getByText("Test label")).toBeInTheDocument();
  });

  it("should render two columns passing two columns", () => {
    const props = {
      headerGroups: [
        {
          getHeaderGroupProps: jest.fn(),
          headers: [
            {
              getHeaderProps: jest.fn(),
              getSortByToggleProps: jest.fn(),
              render: jest.fn().mockReturnValue("Test label 1"),
            },
          ],
        },
        {
          getHeaderGroupProps: jest.fn(),
          headers: [
            {
              getHeaderProps: jest.fn(),
              getSortByToggleProps: jest.fn(),
              render: jest.fn().mockReturnValue("Test label 2"),
            },
          ],
        },
      ] as unknown as HeaderGroup[],
    };

    renderWithTable(props);

    expect(screen.getByText("Test label 1")).toBeInTheDocument();
    expect(screen.getByText("Test label 2")).toBeInTheDocument();
  });
});
