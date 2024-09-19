import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  BarChart,
  FileSearch,
  LineChart,
  Loader2,
} from "lucide-react";
import React, { useState } from "react";
import DataCard from "./DataCard";
import AreaVariant from "./AreaVariant";
import BarVaraint from "./BarVaraint";
import LineVaraint from "./LineVaraint";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type ChartComponentProps = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

const ChartComponent: React.FC<ChartComponentProps> = ({ data = [] }) => {
  const [chartType, setChartType] = useState("area");
  const typeChange = (type: string) => {
    setChartType(type);
  };

  return (
    <Card className="border-none drop-shadow-md">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
        <Select defaultValue={chartType} onValueChange={typeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart type" />
          </SelectTrigger>
          <SelectContent className="cursor-pointer">
            <SelectItem value="area">
              <div className="flex items-center cursor-pointer">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Area chart</p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center cursor-pointer">
                <LineChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Line chart</p>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center cursor-pointer">
                <BarChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Bar chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center flex-col gap-y-4 justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No data for this period
            </p>
          </div>
        ) : (
          <>
            {chartType === "area" && <AreaVariant data={data} />}
            {chartType === "line" && <LineVaraint data={data} />}
            {chartType === "bar" && <BarVaraint data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartComponent;

export const ChartLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm h-[192px]">
      <CardHeader className="flex flex-row items-center justify-center gap-x-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-8 lg:w-[120px] w-full" />
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full flex items-center justify-center">
          <Loader2 className="size-7 text-slate-300 animate-spin" />
        </div>
      </CardContent>
    </Card>
  );
};
