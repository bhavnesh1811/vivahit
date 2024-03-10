import { createContext } from "react";
import { useQuery } from "react-query";
import { fetchData } from "../api/api";

export const DataContext = createContext();

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
