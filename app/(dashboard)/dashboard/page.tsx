"use client"

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/UseNewAccount";
import React from "react";
import DataGrid from "./DataGrid";
import DataChart from "./DataChart";

const page = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid />
        <DataChart />
    </div>
  );
};

export default page;
