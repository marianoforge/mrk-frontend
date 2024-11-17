import { useQuery } from "@tanstack/react-query";
import { DrugDetails } from "../types";

export const useDrugDetails = (id: string) => {
  return useQuery<DrugDetails>({
    queryKey: ["drugDetails", id],
    queryFn: async () => {
      const res = await fetch(`/api/drugs/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch drug details");
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};
