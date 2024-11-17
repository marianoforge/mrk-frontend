import { UseDrugsOptions, UseDrugsResponse } from "@/app/(modules)/drugs/types";
import { useQuery } from "@tanstack/react-query";

export const useDrugs = ({
  limit = 10,
  offset = 0,
  sortField = null,
  sortOrder = null,
  filter = null,
  search = null,
}: UseDrugsOptions) => {
  return useQuery<UseDrugsResponse>({
    queryKey: [
      "drugs",
      { limit, offset, sortField, sortOrder, filter, search },
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      });

      if (sortField) params.append("sortField", sortField);
      if (sortOrder) params.append("sortOrder", sortOrder);
      if (filter) params.append("filter", filter);
      if (search) params.append("search", search);

      const res = await fetch(`/api/drugs?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Error fetching drugs data");
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
};
