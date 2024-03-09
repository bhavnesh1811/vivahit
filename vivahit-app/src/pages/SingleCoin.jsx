import { Box, Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getChartData, getSingleCoin } from "../api/api";
import LineChart from "../components/LineChart";
import Loader from "../components/Loader";
import SelectDays from "../components/SelectDays";
import { calculateData } from "../scripts/script";

const SingleCoin = () => {
  const { id } = useParams();
  const [singleCoinData, setSingleCoinData] = useState({});
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  useMemo(async () => {
    if (!id) {
      return null;
    }
    try {
      const { data } = await getSingleCoin(id);
      setSingleCoinData(data);
    } catch (error) {
      console.error("Error fetching single coin data:", error);
      return null;
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return null;
      }
      setLoading(true);
      try {
        const { data } = await getChartData(id, days);
        setChartData(data?.prices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching single coin data:", error);
        setChartData(null);
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <Box>
      <SelectDays days={days} setDays={setDays} />
      {loading ? (
        <Loader />
      ) : (
        <LineChart
          data={{
            labels: chartData?.map((coin, index) => {
              let date = new Date(coin[0]);
              return calculateData(days, date, index);
            }),
            datasets: [
              {
                label:
                  days === 1
                    ? `Price Past ${days} Day`
                    : `Price Past ${days} Days`,
                data: chartData?.map((coin) => coin[1]),
                borderColor: "green",
              },
            ],
          }}
          aspectRatio={isMobile ? 1 / 0.72 : 1 / 0.4}
        />
      )}
      {singleCoinData && (
        <>
          <Image
            src={singleCoinData?.image?.large}
            alt={singleCoinData?.name}
            height="200"
            marginBottom="20"
          />
          <Text as="h3" fontSize="xl" marginBottom="4" className="heading">
            {singleCoinData?.name}
          </Text>
          <Text fontSize="md" className="description">
            {singleCoinData?.description?.en}
          </Text>

          <Flex direction="column" className="marketData">
            <Flex>
              <Text as="h5" fontSize="md" className="heading">
                Rank:
              </Text>
              <Text fontSize="md" fontFamily="Montserrat">
                {singleCoinData?.market_cap_rank}
              </Text>
            </Flex>

            <Flex>
              <Text as="h5" fontSize="md" className="heading">
                Current Price:
              </Text>
              <Text fontSize="md" fontFamily="Montserrat">
                {singleCoinData?.market_data?.current_price["usd"]}
              </Text>
            </Flex>

            <Flex>
              <Text as="h5" fontSize="md" className="heading">
                Market price:
              </Text>
              <Text fontSize="md" fontFamily="Montserrat">
                {singleCoinData?.market_data?.market_cap["usd"]
                  .toString()
                  .slice(0, -6)}
              </Text>
            </Flex>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default SingleCoin;
