import React, { useContext, useState } from "react";
import { Flex, List, ListItem, Button } from "@chakra-ui/react";

import TableData from "./TableData";
import { useSearchParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import Loader from "./Loader";

const Pagination = ({ itemsPerPage = 7 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || 1)
  );
  const { data, loading, error } = useContext(DataContext);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentPageData = data?.slice(startIdx, endIdx);
  console.log(loading, error);
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    // Only show pages within the specified range
    if (
      i === 1 ||
      i === currentPage - 1 ||
      i === currentPage ||
      i === currentPage + 1 ||
      i === totalPages
    ) {
      paginationItems.push(
        <ListItem
          key={i}
          listStyleType="none"
          mx={0.5}
          cursor="pointer"
          onClick={() => handlePageClick(i)}
          bgColor={currentPage === i ? "teal.500" : "transparent"}
          color={currentPage === i ? "white" : "teal.500"}
          borderRadius="md"
          _hover={{ bgColor: "teal.300", color: "white" }}
        >
          <Button variant="unstyled">{i}</Button>
        </ListItem>
      );
    } else if (
      (i === currentPage - 2 && currentPage > 2) ||
      (i === currentPage + 2 && currentPage < totalPages - 1)
    ) {
      // Show ellipsis (...) for pages that are not directly adjacent to the current page
      paginationItems.push(
        <ListItem key={i} listStyleType="none" mx={0.5} cursor="default">
          <Button variant="unstyled" disabled>
            ...
          </Button>
        </ListItem>
      );
    }
  }

  return (
    <Flex direction="column" align="center">
      {loading ? (
        <Loader />
      ) : (
        <>
          <TableData currentPageData={currentPageData} />

          <List display="flex" alignItems="center" my="20px">
            {paginationItems}
          </List>
        </>
      )}
    </Flex>
  );
};

export default Pagination;
