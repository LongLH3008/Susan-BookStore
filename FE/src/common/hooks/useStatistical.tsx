import { getTopUser } from "@/services/statistical.service";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

interface PropContextStatiscal {
	children: React.ReactNode;
}
interface StatiscalContextType {
	DataTopUser: UseQueryResult<any, Error>;
}
export const StatiscalContext = createContext<StatiscalContextType>({} as StatiscalContextType);

export const StatiscalProvider = ({ children }: PropContextStatiscal) => {
	const DataTopUser = useQuery({
		queryKey: ["dataTopUser"],
		queryFn: () => getTopUser(),
		staleTime: 5000,
	});
	return <StatiscalContext.Provider value={{ DataTopUser }}>{children}</StatiscalContext.Provider>;
};
export default function useStatiscal() {
	return useContext(StatiscalContext);
}
