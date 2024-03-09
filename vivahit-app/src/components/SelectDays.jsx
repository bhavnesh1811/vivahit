import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { daysData } from "../scripts/script";

const SelectDays = ({ days, setDays }) => {
  return (
    <Flex p="4px" gap="8px">
      {daysData?.map((data, index) => (
        <Box
          border={"1px solid gray"}
          p={"4px 8px"}
          borderRadius={"8px"}
          value={days}
          key={index}
          bg={data.value === days ? "green.500" : ""}
          cursor={"pointer"}
          _hover={{ bg: "green.300" }}
          onClick={() => setDays(data.value)}
        >
          {data.days}
        </Box>
      ))}
    </Flex>
  );
};

export default SelectDays;
