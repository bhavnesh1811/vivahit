import React from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const TableData = ({ currentPageData }) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  return (
    <TableContainer overflow={"hidden"}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Coin</Th>
            <Th>Price</Th>
            <Th>24h % Change</Th>
            <Th>24h Volume</Th>
            <Th>Market Cap</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentPageData &&
            currentPageData?.map((item, index) => (
              <Tr cursor={"pointer"} key={index} onClick={() => navigate(`/coins/${item?.id}`)}>
                <Td>{item?.market_cap_rank}</Td>
                <Td>
                  <Flex gap="4px" alignItems={"center"}>
                    <Image
                      w={{ base: "20%", xl: "5%" }}
                      src={item?.image}
                      alt={item?.image}
                    />
                    <Text>{item?.name}</Text>
                    <Text textTransform={"uppercase"}>{item?.symbol}</Text>
                  </Flex>
                </Td>
                <Td>${item?.current_price}</Td>
                <Td>
                  {item?.price_change_percentage_24h < 0 ? (
                    <Flex
                      gap="4px"
                      alignItems={"center"}
                      color={colorMode === "dark" ? "red.500" : "red.400"}
                    >
                      <IoMdArrowDropdown />
                      <Text>{item?.price_change_percentage_24h}</Text>
                    </Flex>
                  ) : (
                    <Flex
                      gap="4px"
                      alignItems={"center"}
                      color={colorMode === "dark" ? "green.500" : "green.400"}
                    >
                      <IoMdArrowDropup />
                      <Text>{item?.price_change_percentage_24h}</Text>
                    </Flex>
                  )}
                </Td>
                <Td>${item?.total_volume}</Td>
                <Td>${item?.market_cap}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableData;
