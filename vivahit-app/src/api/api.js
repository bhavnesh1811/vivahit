import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getSingleCoin = async (id) => {
  const res = await axios.get(
    `${baseUrl}coins/${id}?x_cg_demo_api_key=${apiKey}&vs_currency=USD`
  );

  return res;
};

export const getChartData = async (id, days) => {
  const res = await axios.get(
    `${baseUrl}coins/${id}/market_chart?x_cg_demo_api_key=${apiKey}&vs_currency=USD&days=${days}`
  );
console.log(res);
  return res;
};
