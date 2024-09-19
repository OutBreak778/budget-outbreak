"use client";

import EditAccountSheet from "@/features/accounts/components/EditAccountSheet";
import NewAccountSheet from "@/features/accounts/components/NewAccountSheet";
import EditCategorySheet from "@/features/categories/components/EditCategorySheet";
import NewCategorySheet from "@/features/categories/components/NewCategorySheet";
import EditTransactionSheet from "@/features/transactions/components/EditTransactionSheet";
import NewTransactionsSheet from "@/features/transactions/components/NewTransactionsSheet";



import React from "react";
import { useMountedState } from "react-use";

const SheetProvider = () => {
  const isMounted = useMountedState();
  if (!isMounted) {
    return null;
  }
  return (
    <>
      {/* Account Sheet */}
      <NewAccountSheet />
      <EditAccountSheet />
      {/* Category Sheet */}
      <NewCategorySheet /> 
      <EditCategorySheet />
      {/* Trasnaction Sheet */}
      <NewTransactionsSheet /> 

      <EditTransactionSheet />
    </>
  );
};

export default SheetProvider;
