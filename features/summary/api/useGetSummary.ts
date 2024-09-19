import { categories } from "@/db/schema";
import { client } from "@/lib/hono";
import { ConvertAmountFromMiliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetSummary = () => {

  const params = useSearchParams()
  const from = params.get("from") || ""
  const to = params.get("to") || ""
  const accountId = params.get("accountId") || ""

  const query = useQuery({
    queryKey: ["summary", {
      from, to, accountId
    }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
        from, to, accountId
        }
      });

      if (!response.ok) {
        throw new Error(
          "Failed to fetch the transaction data "
        );
      }

      const { data } = await response.json();

      return {
        ...data,
        incomeAmount: ConvertAmountFromMiliunits(data.incomeAmount),
        expenseAmount: ConvertAmountFromMiliunits(data.expenseAmount),
        remainingAmount: ConvertAmountFromMiliunits(data.remainingAmount),
        categories: data.categories.map((item) => ({
            ...item,
            value: ConvertAmountFromMiliunits(item.value)
        })),
        days: data.days.map((item) => ({
            ...item,
            income: ConvertAmountFromMiliunits(item.income),
            expenses: ConvertAmountFromMiliunits(item.expenses),
        }))
      }
    },
  });

  return query;
};
