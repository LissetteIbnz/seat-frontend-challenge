import * as React from "react";
import { UserRowComponent } from "./components";
import { FILTERS, HEADERS, User } from "./user-list.vm";
import { useSearchBar } from "common/components";
import { RowRendererProps, TableContainer } from "common/components/table";

interface Props {
  onCreate: VoidFunction;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  users: User[];
}

export const UserListComponent = ({ users, onDelete, onCreate, onEdit }: Props) => {
  const { filteredList, onSearch, search } = useSearchBar(users, FILTERS);

  const contentRender = ({ itemName }: { itemName: string }) => {
    return <>Are you sure to delete {itemName}? You can't undo this action afterwards.</>;
  };

  const labels = React.useMemo(
    () => ({
      acceptButton: "Confirm",
      closeButton: "Cancel",
      createButton: "New User",
      deleteContent: contentRender,
      deleteTitle: "Delete User",
      searchPlaceholder: "Search user",
    }),
    [],
  );

  return (
    <TableContainer<User>
      onCreate={onCreate}
      onEdit={onEdit}
      columns={HEADERS}
      enablePagination={true}
      enableSearch={true}
      labels={labels}
      onDelete={onDelete}
      onSearch={onSearch}
      pageSize={5}
      rowRenderer={(rowProps: RowRendererProps<User>) => <UserRowComponent {...rowProps} />}
      rows={filteredList}
      search={search}
      sx={{
        maxWidth: "1170px",
        width: "100%",
      }}
    />
  );
};
