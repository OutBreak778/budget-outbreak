import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetCategory = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await client.api.categories.$get();

      if (!response.ok) {
        throw new Error(
          "Failed to fetch the data, featurescategoryapi/useGetCategory"
        );
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
