import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetIndividualCategory = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["categories", {id}],
    queryFn: async () => {
      const response = await client.api.categories[":id"].$get({
        param: {id}
      });

      if (!response.ok) {
        throw new Error(
          "Failed to fetch individual the data, features/categorys/api/useGetCategory"
        );
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
