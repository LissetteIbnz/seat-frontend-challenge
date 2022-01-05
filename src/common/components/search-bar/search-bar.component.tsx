import { Input, InputGroup, InputLeftElement, SystemStyleObject } from "@chakra-ui/react";
import { SearchIcon } from "assets/icons";

interface Props {
  search: string;
  onSearch: (search: string) => void;
  placeholder: string;
  sx?: SystemStyleObject;
}

export const SearchBar = ({ onSearch, placeholder, search, sx }: Props) => (
  <InputGroup sx={sx}>
    <InputLeftElement pointerEvents="none" children={<SearchIcon width="1em" height="1em" />} />
    <Input
      type="search"
      placeholder={placeholder}
      value={search}
      onChange={(evt) => onSearch(evt.target.value)}
    />
  </InputGroup>
);
