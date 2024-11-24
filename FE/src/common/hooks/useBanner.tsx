import { getAllBanners } from "@/services/banner.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { IBanner } from "../interfaces/banner";

interface PropContextBanner {
  children: React.ReactNode;
}
interface BannerContextType {
  DataBanners: UseQueryResult<any, Error>;
  dataBannerHome: IBanner | undefined;
}

export const BannerContext = createContext<BannerContextType>(
  {} as BannerContextType
);

export const BannerProvider = ({ children }: PropContextBanner) => {
  const DataBanners = useQuery({
    queryKey: ["Banner"],
    queryFn: () => getAllBanners(),
  });
  const [dataBannerHome, setDataBannerHome] = useState<IBanner | undefined>(
    undefined
  );
  useEffect(() => {
    if (DataBanners.data && DataBanners.data.metadata.length > 0) {
      setDataBannerHome(DataBanners.data.metadata[0]);
    }
  }, [DataBanners.data]);
  return (
    <BannerContext.Provider value={{ DataBanners, dataBannerHome }}>
      {children}
    </BannerContext.Provider>
  );
};

export default function useBanner() {
  return useContext(BannerContext);
}
