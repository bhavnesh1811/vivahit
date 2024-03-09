import axios from "axios";
import { createContext } from "react";
import { useQuery } from "react-query";

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const DataContext = createContext();

const fetchData = async () => {
  const timestamp = new Date().getTime();
  const response = await axios.get(
    `${baseUrl}coins/markets?x_cg_demo_api_key=${apiKey}&vs_currency=USD&_=${timestamp}`
  );
  return response.data;
};

const DataContextProvider = ({ children }) => {
  const { data, isLoading, error } = useQuery("myData", fetchData, {
    staleTime: 3000000,
    refetchInterval: 3000000, // Refetch data every 1 minute (60000 milliseconds)
  });

  return (
    <DataContext.Provider value={{ data, loading: isLoading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
