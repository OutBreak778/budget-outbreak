"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import qs from "query-string";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useGetAccount } from "@/features/accounts/api/useGetAccount";
import { useGetSummary } from "@/features/summary/api/useGetSummary";

const AccountFilter = () => {
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccount();
  const { isLoading: isLoadingSummary } = useGetSummary();

  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const accountId = params.get("accountId") || "all";
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to,
    };

    if (newValue === "all") {
      query.accountId = "";
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
        <SelectValue placeholder="Select an Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all" className="cursor-pointer">
          All account
        </SelectItem>
        {accounts?.map((account) => (
          <SelectItem
            className="cursor-pointer"
            key={account.id}
            value={account.id}
          >
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AccountFilter;
