import { getTopBook, getTopUser } from "@/services/statistical.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext } from "react";

interface PropContextStatiscal {
  children: React.ReactNode;
}
interface StatiscalContextType {
  DataTopBook: UseQueryResult<any, Error>;
  DataTopUser: UseQueryResult<any, Error>;
}
export const StatiscalContext = createContext<StatiscalContextType>(
  {} as StatiscalContextType
);

export const StatiscalProvider = ({ children }: PropContextStatiscal) => {
  const DataTopBook = useQuery({
    queryKey: ["dataTopBook"],
    queryFn: () => getTopBook(),
    staleTime: 5000,
  });
  const DataTopUser = useQuery({
    queryKey: ["dataTopUser"],
    queryFn: () => getTopUser(),
    staleTime: 5000,
  });
  return (
    <StatiscalContext.Provider value={{ DataTopBook, DataTopUser }}>
      {children}
    </StatiscalContext.Provider>
  );
};
export default function useStatiscal() {
  return useContext(StatiscalContext);
}
