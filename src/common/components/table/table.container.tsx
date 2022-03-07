import * as React from "react";
import { useTable, usePagination, useSortBy, Column } from "react-table";
import { SystemStyleObject } from "@chakra-ui/react";
import { useConfirmationDialog } from "../confirmation-dialog";
import { RowRendererProps, LabelProps, createEmptyLabelProps } from "./table.vm";
import { TableComponent } from "./table.component";

const HOOKS = [useSortBy, usePagination];

interface Props<Model extends Record<keyof Model, unknown>> {
  columns: Column<Model>[];
  enablePagination?: boolean;
  enableSearch?: boolean;
  labels?: LabelProps;
  onCreate?: VoidFunction;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onSearch?: (search: string) => void;
  pageSize?: number;
  rowRenderer: (props: RowRendererProps<Model>) => React.ReactNode;
  rows: Model[];
  search?: string;
  sx?: SystemStyleObject;
}

export const TableContainer = <T extends Record<keyof T, unknown>>(
  props: React.PropsWithChildren<Props<T>>,
) => {
  const { sx } = props;

  const labels = { ...createEmptyLabelProps(), ...props.labels };

  const columns = React.useMemo(() => props.columns, [props.columns]);

  const data = React.useMemo(() => props.rows, [props.rows]);

  const { getTableProps, headerGroups, rows, prepareRow, page, gotoPage, pageOptions } =
    useTable<T>(
      {
        columns,
        data,
        initialState: { pageSize: props.pageSize },
      },
      ...HOOKS,
    );

  const { isOpen, itemToDelete, onOpenDialog, onClose, onAccept } = useConfirmationDialog();

  const handleDelete = () => {
    if (props.onDelete) {
      props.onDelete(itemToDelete.id);
      onAccept();
    }
  };

  return (
    <TableComponent
      enablePagination={Boolean(props.enablePagination && pageOptions.length > 1)}
      enableSearch={props.enableSearch}
      goToPage={gotoPage}
      headerGroups={headerGroups}
      isOpenConfirmation={isOpen}
      itemToDeleteName={itemToDelete.name}
      labels={labels}
      onCloseConfirmation={onClose}
      onCreate={props.onCreate}
      onDelete={Boolean(props.onDelete) ? handleDelete : undefined}
      onSearch={props.onSearch}
      pageCount={pageOptions.length}
      prepareRow={prepareRow}
      rowRenderer={(rowProps) =>
        props.rowRenderer({
          ...rowProps,
          onEdit: props.onEdit,
          onDelete: Boolean(props.onDelete) ? onOpenDialog : undefined,
        })
      }
      rows={props.enablePagination ? page : rows}
      search={props.search}
      sx={sx}
      tableProps={{ ...getTableProps() }}
    />
  );
};
