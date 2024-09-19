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
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
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

const RadarVaraint: React.FC<PieVariantProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>

        <Tooltip content={<CategoryTooltip />} />
        <PolarGrid />
        <PolarAngleAxis style={{fontSize: "12px"}}  dataKey="name"/>
        <PolarRadiusAxis style={{fontSize: "12px"}} />
        <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarVaraint;
