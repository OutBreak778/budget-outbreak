import CategoryTooltip from "@/components/CategoryTooltip";
import { FormatPercent } from "@/lib/utils";
import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type PieVariantProps = {
  data: {
    name: string;
    value: number;
  }[];
};

const PieVariant: React.FC<PieVariantProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({payload}: any) => {
            return(
                <ul className="flex flex-col space-y-2">
                    {payload.map((entry: any, index: number) => (
                        <li key={`item-${index}`} className="flex items-center space-x-2">
                            <span className="size-2 rounded-full" style={{backgroundColor: entry.color}} />
                            <div className="space-x-1">
                                <span className="text-sm text-muted-foreground">
                                    {entry.value}
                                </span>
                                <span className="text-sm">
                                    {FormatPercent(entry.payload.percent * 1000)}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )
          }}
        />
        <Tooltip content={<CategoryTooltip />} />
        <Pie
          dataKey="value"
          labelLine={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={62}
          paddingAngle={2}
          fill="#8884D8"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieVariant;
