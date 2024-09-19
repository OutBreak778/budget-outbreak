"use client";

import { useGetSummary } from "@/features/summary/api/useGetSummary";
import { formatDateRange } from "@/lib/utils";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import React from "react";
import DataCard, { DataCardLoading } from "./DataCard";

const DataGrid = () => {
  const { data, isLoading } = useGetSummary();

  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;

  const dateRange = formatDateRange({ to, from });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Remaining"
        value={data?.remainingAmount}
        percentChange={data?.remainingChange}
        variant="default"
        icon={FaPiggyBank}
        dateRange={dateRange}
      />
      <DataCard
        title="Income"
        value={data?.incomeAmount}
        percentChange={data?.incomeChange}
        variant="success"
        icon={FaArrowTrendUp}
        dateRange={dateRange}
      />
      <DataCard
        title="Expense"
        value={data?.expenseAmount}
        percentChange={data?.expenseChange}
        variant="danger"
        icon={FaArrowTrendDown}
        dateRange={dateRange}
      />
    </div>
  );
};

export default DataGrid;
