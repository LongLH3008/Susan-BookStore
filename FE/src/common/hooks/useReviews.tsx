import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext } from "react";

interface PropContextReview {
  children: React.ReactNode;
}
interface ReviewContextType {
  DataReviews: UseQueryResult<any, Error>;
}

export const ReviewContext = createContext<ReviewContextType>(
  {} as ReviewContextType
);

export const ReviewProvider = ({ children }: PropContextReview) => {
  const DataReviews = useQuery({
    queryKey: ["Review"],
    queryFn: () => getReviews(),
  });

  return (
    <ReviewContext.Provider value={{ DataReviews }}>
      {children}
    </ReviewContext.Provider>
  );
};

export default function useReview() {
  return useContext(ReviewContext);
}
