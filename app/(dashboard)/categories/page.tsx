"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PlusIcon } from "lucide-react";
import React from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewCategory } from "@/features/categories/hooks/UseNewCategory";
import { useBulkDeleteCategory } from "@/features/categories/api/useBulkDeleteCategory";
import { useGetCategory } from "@/features/categories/api/useGetCategory";


const page = () => {
  const newCategory = useNewCategory();
  const deleteCategory = useBulkDeleteCategory()
  const categoryQuery = useGetCategory();
  const category = categoryQuery.data || [];

  const isDisabled = categoryQuery.isLoading || deleteCategory.isPending

  if (categoryQuery.isLoading) {
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
          <CardTitle className="text-xl line-clamp-1">Category page</CardTitle>
          <Button
            variant="default"
            size={"sm"}
            className="px-4"
            onClick={newCategory.onOpen}
          >
            <PlusIcon className="size-4 mr-3" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={category}
            disabled={isDisabled}
            onDelete={(rows) => {
              const ids = rows.map((r) => r.original.id)
              deleteCategory.mutate({ids})
            }}
            filterKey="name"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
