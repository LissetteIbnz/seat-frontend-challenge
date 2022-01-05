import { HeaderGroup } from "react-table";
import { chakra, Thead, Tr, Th } from "@chakra-ui/react";

interface Props<T extends Record<keyof T, unknown>> {
  headerGroups: HeaderGroup<T>[];
}

export const HeaderComponent = <T extends Record<keyof T, unknown>>({ headerGroups }: Props<T>) => {
  return (
    <Thead bg="purple.900">
      {headerGroups.map((headerGroup) => (
        <Tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <Th color="white" {...column.getHeaderProps(column.getSortByToggleProps())}>
              {column.render("Header")}
              <chakra.span pl="4">
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <chakra.span aria-label="sorted descending">🔽</chakra.span>
                  ) : (
                    <chakra.span aria-label="sorted ascending">🔼</chakra.span>
                  )
                ) : null}
              </chakra.span>
            </Th>
          ))}
        </Tr>
      ))}
    </Thead>
  );
};
