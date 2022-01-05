import * as React from "react";
import { TableProps, HeaderGroup, Row } from "react-table";
import {
  Table,
  Button,
  TableContainer,
  Box,
  Flex,
  Text,
  SystemStyleObject,
} from "@chakra-ui/react";
import { SearchBar } from "../search-bar";
import { PaginationComponent } from "../pagination";
import { ConfirmationDialogComponent } from "../confirmation-dialog";
import { HeaderComponent, BodyComponent } from "./components";
import { RowRendererProps, LabelProps } from "./table.vm";

interface Props<T extends Record<keyof T, unknown>> {
  enablePagination: boolean;
  enableSearch: boolean;
  goToPage?: (pageIndex: number) => void;
  headerGroups: HeaderGroup<T>[];
  isOpenConfirmation?: boolean;
  itemToDeleteName?: string;
  labels: LabelProps;
  onCloseConfirmation?: VoidFunction;
  onCreate?: VoidFunction;
  onDelete?: VoidFunction;
  onSearch?: (search: string) => void;
  pageCount?: number;
  prepareRow: (row: Row<T>) => void;
  rowRenderer: (props: RowRendererProps<T>) => React.ReactNode;
  rows: Row<T>[];
  search?: string;
  sx?: SystemStyleObject;
  tableProps: TableProps;
}

export const TableComponent = <T extends Record<string, unknown>>(props: Props<T>) => {
  const {
    enablePagination,
    enableSearch,
    goToPage,
    headerGroups,
    isOpenConfirmation,
    itemToDeleteName,
    labels,
    onCloseConfirmation,
    onCreate,
    onDelete,
    onSearch,
    pageCount,
    prepareRow,
    rowRenderer,
    rows,
    search,
    sx,
    tableProps,
  } = props;

  return (
    <Box sx={sx}>
      <Flex flexDirection="column">
        {enableSearch && (
          <SearchBar
            sx={{ marginBottom: "1rem" }}
            search={search}
            onSearch={onSearch}
            placeholder={labels.searchPlaceholder}
          />
        )}

        <TableContainer>
          <Table
            sx={{
              overflow: "hidden",
            }}
            bg="white"
            borderRadius="md"
            colorScheme="gray"
            variant="striped"
            {...tableProps}
          >
            <HeaderComponent headerGroups={headerGroups} />
            <BodyComponent
              rows={rows}
              prepareRow={prepareRow}
              rowRenderer={rowRenderer}
              numberColumns={headerGroups.length}
            />
          </Table>
        </TableContainer>

        {enablePagination && <PaginationComponent pageCount={pageCount} onChange={goToPage} />}

        {onCreate && (
          <Button mt={3} onClick={onCreate} alignSelf="flex-end" colorScheme="teal" width="200px">
            {labels.createButton}
          </Button>
        )}

        {onDelete && (
          <ConfirmationDialogComponent
            isOpen={isOpenConfirmation}
            onAccept={onDelete}
            onClose={onCloseConfirmation}
            title={labels.deleteTitle}
            labels={{
              closeButton: labels.closeButton,
              acceptButton: labels.acceptButton,
            }}
          >
            <Text>{labels.deleteContent({ itemName: itemToDeleteName })}</Text>
          </ConfirmationDialogComponent>
        )}
      </Flex>
    </Box>
  );
};
