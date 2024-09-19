import { client } from "@/lib/hono";
import { ConvertAmountFromMiliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetIndividualTransactions = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transactions", {id}],
    queryFn: async () => {
      const response = await client.api.transactions[":id"].$get({
        param: {id}
      });

      if (!response.ok) {
        throw new Error(
          "Failed to fetch individual the transaction data"
        );
      }

      const { data } = await response.json();

      return {...data,
        amount: ConvertAmountFromMiliunits(data.amount)
      };
    },
  });

  return query;
};
