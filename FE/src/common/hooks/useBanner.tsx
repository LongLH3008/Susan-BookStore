import { getAllBanners, getAllBannerSale } from "@/services/banner.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { IBannerHome } from "../interfaces/banner";

interface PropContextBanner {
  children: React.ReactNode;
}
interface BannerContextType {
  DataBanners: UseQueryResult<any, Error>;
  DataBannerSale: UseQueryResult<any, Error>;
}

export const BannerContext = createContext<BannerContextType>(
  {} as BannerContextType
);

export const BannerProvider = ({ children }: PropContextBanner) => {
  const DataBanners = useQuery({
    queryKey: ["Banner"],
    queryFn: () => getAllBanners(),
  });
  const DataBannerSale = useQuery({
    queryKey: ["BannerSale"],
    queryFn: () => getAllBannerSale(),
  });

  return (
    <BannerContext.Provider value={{ DataBanners, DataBannerSale }}>
      {children}
    </BannerContext.Provider>
  );
};

export default function useBanner() {
  return useContext(BannerContext);
}
