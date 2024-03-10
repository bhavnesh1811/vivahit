import { createContext } from "react";
import { useQuery } from "react-query";
import { fetchData } from "../api/api";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {

  const { data, isLoading, error } = useQuery("myData", fetchData, {
    staleTime: 60000,
    refetchInterval: 60000,
  });


  return (
    <DataContext.Provider value={{ data, loading: isLoading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
