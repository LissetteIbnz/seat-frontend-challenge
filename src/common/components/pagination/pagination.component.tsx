import ReactPaginate from "react-paginate";
import { SystemStyleObject } from "@chakra-ui/react";
import * as styles from "./pagination.styles";

interface Props {
  pageCount: number;
  onChange: (pageIndex: number) => void;
  itemsPerPage?: number;
  sx?: SystemStyleObject;
}

export const PaginationComponent = ({ onChange, pageCount, itemsPerPage = 5, sx }: Props) => {
  const handleChangePage = (selectedItem: { selected: number }) => {
    const newOffset = (selectedItem.selected * itemsPerPage) % pageCount;
    onChange(newOffset);
  };

  return (
    <styles.Wrapper sx={sx}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handleChangePage}
        pageRangeDisplayed={itemsPerPage}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </styles.Wrapper>
  );
};
