import { Box, useBreakpointValue } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getChartData, getSingleCoin } from "../api/api";
import LineChart from "../components/LineChart";
import Loader from "../components/Loader";
import SelectDays from "../components/SelectDays";
import { calculateData } from "../scripts/script";
import CoinDetails from "../components/CoinDetails";
import Error404 from "./Error404";

const SingleCoin = () => {
  const { id } = useParams();
  const [singleCoinData, setSingleCoinData] = useState({});
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  useMemo(async () => {
    if (!id) {
      return null;
    }
    try {
      const { data } = await getSingleCoin(id);
      setSingleCoinData(data);
      setError(false);
    } catch (error) {
      setError(true);
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
        setError(false);
      } catch (error) {
        console.error("Error fetching single coin data:", error);
        setChartData(null);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, id]);

  return (
    <>
      {error ? (
        <Error404 />
      ) : (
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
          {singleCoinData && <CoinDetails {...singleCoinData} />}
        </Box>
      )}{" "}
    </>
  );
};

export default SingleCoin;
