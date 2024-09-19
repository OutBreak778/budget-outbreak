"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransactions } from "@/features/transactions/hooks/UseNewTransactions";
import { useGetTransactions } from "@/features/transactions/api/useGetTransactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/useBulkDeleteTransactions";

const page = () => {

  const newTransaction = useNewTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const transactionQuery = useGetTransactions();
  const transactions = transactionQuery.data || [];

  const isDisabled = transactionQuery.isLoading || deleteTransactions.isPending;


  if (transactionQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto  w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="h-[500px] w-full flex items-center justify-center">
            <Loader2 className="animate-spin text-gray-300 size-7" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto  w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-3 lg:flex-row lg:items-start lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions history
          </CardTitle>
          <div className="flex flex-col: lg:flex-row items-center gap-x-3 ">
            <Button
              variant="default"
              size={"sm"}
              className="px-4 w-full lg:w-auto"
              onClick={newTransaction.onOpen}
            >
              <PlusIcon className="size-4 mr-3" />
              Add new
            </Button>

          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            disabled={isDisabled}
            onDelete={(rows) => {
              const ids = rows.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            filterKey="payee"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
