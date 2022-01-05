import { RowRendererProps, RowComponent } from "common/components";
import { IconButton, Td } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "assets/icons";
import { User } from "../user-list.vm";

type Props = RowRendererProps<User>;

export const UserRowComponent = ({ row, onEdit, onDelete }: Props) => {
  return (
    <RowComponent>
      <Td>{row.id}</Td>
      <Td>{row.fullName}</Td>
      <Td>{row.email}</Td>
      <Td>
        <IconButton
          variant="ghost"
          size="sm"
          colorScheme="teal"
          isRound={true}
          aria-label="Edit"
          onClick={() => onEdit(row.id.toString())}
          mr={2}
          icon={<EditIcon width="1.1rem" height="1.1rem" />}
        />
        <IconButton
          variant="ghost"
          size="sm"
          colorScheme="red"
          isRound={true}
          aria-label="Delete"
          onClick={() =>
            onDelete({
              id: row.id.toString(),
              name: row.fullName,
            })
          }
          icon={<DeleteIcon width="1.1rem" height="1.1rem" />}
        />
      </Td>
    </RowComponent>
  );
};
