import * as React from "react";
import { Row } from "react-table";
import { Tbody, Tr, Td } from "@chakra-ui/react";
import { RowRendererProps } from "../table.vm";

interface Props<T extends Record<keyof T, unknown>> {
  numberColumns: number;
  prepareRow: (row: Row<T>) => void;
  rowRenderer: (props: RowRendererProps<T>) => React.ReactNode;
  rows: Row<T>[];
}

export const BodyComponent = <T extends Record<keyof T, unknown>>({
  numberColumns,
  prepareRow,
  rowRenderer,
  rows,
}: Props<T>) => {
  return (
    <Tbody>
      {rows.length ? (
        rows.map((row) => {
          prepareRow(row);
          return rowRenderer({
            ...row.getRowProps(),
            row: row.original,
          });
        })
      ) : (
        <Tr>
          <Td colSpan={numberColumns}>No search results found</Td>
        </Tr>
      )}
    </Tbody>
  );
};
