import * as React from "react";
import { Row } from "react-table";
import { Td } from "@chakra-ui/react";
import { render, screen } from "test-utils";
import { RowRendererProps } from "../table.vm";
import { BodyComponent } from "./body.component";
import { RowComponent } from "./row.component";

type BodyProps = React.ComponentProps<typeof BodyComponent>;

const renderWithTable = (props) => {
  return render(
    <table>
      <BodyComponent {...props} />
    </table>,
  );
};

const TestRowComponent = (props: RowRendererProps<any>) => (
  <RowComponent key={props.row.testRow}>
    <Td>{props.row.testRow}</Td>
  </RowComponent>
);

describe("common/components/table/BodyComponent", () => {
  it("should render as expected", () => {
    const props: BodyProps = {
      rows: [
        { getRowProps: jest.fn(), original: { testRow: 1 } },
        { getRowProps: jest.fn(), original: { testRow: 2 } },
        { getRowProps: jest.fn(), original: { testRow: 3 } },
      ] as unknown as Row[],
      rowRenderer: TestRowComponent,
      prepareRow: jest.fn(),
      numberColumns: 1,
    };

    renderWithTable(props);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should render no results", () => {
    const props: BodyProps = {
      rows: [],
      rowRenderer: TestRowComponent,
      prepareRow: jest.fn(),
      numberColumns: 1,
    };

    renderWithTable(props);

    expect(screen.getByText("No search results found")).toBeInTheDocument();
  });
});
