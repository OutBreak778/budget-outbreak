"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/UseNewAccount";
import { Loader2, PlusIcon } from "lucide-react";
import React from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { useGetAccount } from "@/features/accounts/api/useGetAccount";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccount } from "@/features/accounts/api/useBulkDelete";


const page = () => {
  const newAccount = useNewAccount();
  const deleteAccount = useBulkDeleteAccount()
  const accountQuery = useGetAccount();
  const accounts = accountQuery.data || [];

  const isDisabled = accountQuery.isLoading || deleteAccount.isPending

  if (accountQuery.isLoading) {
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
          <CardTitle className="text-xl line-clamp-1">Account page</CardTitle>
          <Button
            variant="default"
            size={"sm"}
            className="px-4"
            onClick={newAccount.onOpen}
          >
            <PlusIcon className="size-4 mr-3" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accounts}
            disabled={isDisabled}
            onDelete={(rows) => {
              const ids = rows.map((r) => r.original.id)
              deleteAccount.mutate({ids})
            }}
            filterKey="name"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
