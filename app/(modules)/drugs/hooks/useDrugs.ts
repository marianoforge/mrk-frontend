import { UseDrugsOptions, UseDrugsResponse } from "@/app/(modules)/drugs/types";
import { TableProps } from "@/app/common/enums";
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
        [TableProps.LIMIT]: limit.toString(),
        [TableProps.OFFSET]: offset.toString(),
      });

      if (sortField) params.append(TableProps.SORT_FIELD, sortField);
      if (sortOrder) params.append(TableProps.SORT_ORDER, sortOrder);
      if (filter) params.append(TableProps.FILTER, filter);
      if (search) params.append(TableProps.SEARCH, search);

      const res = await fetch(`/api/drugs?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Error fetching drugs data");
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
};
