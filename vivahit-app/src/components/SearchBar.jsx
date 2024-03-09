import React from "react";
import { InputGroup, InputLeftAddon, Input } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <InputGroup>
      <InputLeftAddon>
        <CiSearch />
      </InputLeftAddon>
      <Input type="text" placeholder="search here..." />
    </InputGroup>
  );
};

export default SearchBar;
