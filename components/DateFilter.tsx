"use client";

import React, { useState } from "react";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatDateRange } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { PopoverClose } from "@radix-ui/react-popover";

const DateFilter = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const accountId = params.get("accountId") 
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);
  const pushToUrl = (dateRange: DateRange | undefined) => {
    const query = {
      from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
      to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
      accountId,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    router.push(url);
  };

  const onReset = () => {
    setDate(undefined);
    pushToUrl(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
          disabled={false}
          size="sm"
          variant="outline"
        >
          <span>{formatDateRange(paramState)}</span>
          <ChevronDown className="size-4 opacity-50 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-auto w-full p-0" align="start">
        <Calendar
          disabled={false}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className="p-4 w-full flex items-center gap-x-2">
          <PopoverClose asChild>
            <Button
              className="w-full"
              variant={"outline"}
              onClick={onReset}
              disabled={!date?.from || !date?.to}
            >
              Reset
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              className="w-full"
              onClick={() => pushToUrl(date)}
              disabled={!date?.from || !date?.to}
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateFilter;
