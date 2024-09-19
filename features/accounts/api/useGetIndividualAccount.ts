import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetIndividualAccount = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["accounts", {id}],
    queryFn: async () => {
      const response = await client.api.accounts[":id"].$get({
        param: {id}
      });

      if (!response.ok) {
        throw new Error(
          "Failed to fetch individual the data, featuresaccountsapi/useGetAccount"
        );
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
