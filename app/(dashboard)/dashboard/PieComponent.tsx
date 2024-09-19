import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileSearch,
  LineChart,
  Loader2,
  PieChart,
  Radar,
  TargetIcon,
} from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PieVariant from "./PieVariant";
import RadarVaraint from "./RadarVaraint";
import RadialVariant from "./RadialVaraint";
import { Skeleton } from "@/components/ui/skeleton";

type PieComponentProps = {
  data?: {
    name: string;
    value: number;
  }[];
};

const PieComponent: React.FC<PieComponentProps> = ({ data = [] }) => {
  const [pieType, setpieType] = useState("pie");
  const typeChange = (type: string) => {
    setpieType(type);
  };

  return (
    <Card className="border-none drop-shadow-md">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
        <Select defaultValue={pieType} onValueChange={typeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Pie type" />
          </SelectTrigger>
          <SelectContent className="cursor-pointer">
            <SelectItem value="pie">
              <div className="flex items-center cursor-pointer">
                <PieChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Pie chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radar">
              <div className="flex items-center cursor-pointer">
                <Radar className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radial chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radial">
              <div className="flex items-center cursor-pointer">
                <TargetIcon className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Target chart</p>
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
            {pieType === "pie" && <PieVariant data={data} />}
            {pieType === "radar" && <RadarVaraint data={data} />}
            {pieType === "radial" && <RadialVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PieComponent;

export const PieChartLoading = () => {
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
  )
}