import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";

const CoinDetails = (singleCoinData) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();

  return (
    <Flex direction={"column"} my="16px">
      <Flex
        justifyContent={"center"}
        alignItems={isMobile ? "center" : ""}
        gap="24px"
        direction={{ base: "column", md: "row" }}
        py="16px"
      >
        <Box>
          <Image
            src={
              isMobile
                ? singleCoinData?.image?.small
                : singleCoinData?.image?.large
            }
            alt={singleCoinData?.name}
          />
          <Text as="h3" fontSize="xl">
            {singleCoinData?.name}
          </Text>
        </Box>
        <Box w={{ base: "100%", md: "40%" }}>
          <Flex
            direction="column"
            boxShadow={"rgba(0,0,0,0.5)0px 5px 15px"}
            borderRadius={"12px"}
            p={{ base: "16px", md: "24px" }}
            gap="8px"
            bg={colorMode === "dark" ? "green.500" : "green.500"}
            h="full"
          >
            <Flex gap="4px" alignItems={"center"}>
              <Text as="h5" fontSize="md">
                Rank :
              </Text>
              <Text fontSize="md" fontFamily="Montserrat">
                {" "}
                {singleCoinData?.market_cap_rank}
              </Text>
            </Flex>

            <Flex gap="4px" alignItems={"center"}>
              <Text as="h5" fontSize="md">
                Current Price :
              </Text>
              <Text fontSize="md" fontFamily="Montserrat">
                {`$ `}
                {singleCoinData?.market_data?.current_price["usd"]}
              </Text>
            </Flex>

            <Flex gap="4px" alignItems={"center"}>
              <Text as="h5" fontSize="md">
                Market Cap :
              </Text>
              <Text fontSize="md" fontFamily="Montserrat">
                {`$ `}
                {singleCoinData?.market_data?.market_cap["usd"]}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>

      <Text fontSize="md" className="description">
        {isMobile
          ? singleCoinData?.description?.en?.substring(0, 150)
          : singleCoinData?.description?.en}
      </Text>
    </Flex>
  );
};

export default CoinDetails;
