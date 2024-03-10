import React, { useState } from "react";
import { InputGroup, InputLeftAddon, Input } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/coins/${search}`);
      setSearch("")
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <InputGroup>
      <InputLeftAddon
        _disabled={search === "" ? true : false}
        onClick={handleSearch}
        style={{ cursor: search === "" ? "not-allowed" : "pointer" }}
      >
        <CiSearch />
      </InputLeftAddon>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
        type="text"
        placeholder="Search Crypto Here..."
      />
    </InputGroup>
  );
};

export default SearchBar;
