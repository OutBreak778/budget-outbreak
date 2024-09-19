import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetAccount = () => {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await client.api.accounts.$get();

      if (!response.ok) {
        throw new Error(
          "Failed to fetch the data, featuresaccountsapi/useGetAccount"
        );
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
