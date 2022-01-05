import { render, screen } from "test-utils";
import { RowComponent } from "./row.component";

describe("common/components/table/RowComponent", () => {
  it("should render as expected passing required properties", () => {
    const props = {
      sx: {
        marginBottom: "1rem",
      },
      "data-testid": "test-row",
    };

    render(
      <table>
        <tbody>
          <RowComponent {...props}>
            <td>{"Test rowData"}</td>
          </RowComponent>
        </tbody>
      </table>,
    );

    expect(screen.getByTestId(props["data-testid"])).toBeInTheDocument();
    expect(screen.getByText("Test rowData")).toBeInTheDocument();
  });

  it("should render a row component with two cells", () => {
    const props = {};

    render(
      <table>
        <tbody>
          <RowComponent {...props}>
            <td>{"Test rowData 1"}</td>
            <td>{"Test rowData 2"}</td>
          </RowComponent>
        </tbody>
      </table>,
    );

    expect(screen.getByText("Test rowData 1")).toBeInTheDocument();
    expect(screen.getByText("Test rowData 2")).toBeInTheDocument();
  });
});
