import { cva, VariantProps } from "class-variance-authority";
import { IconType } from "react-icons";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, FormatPercent } from "@/lib/utils";
import { CountUp } from "@/components/CountUp";
import { formatCurrency } from "../../../lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const boxVariant = cva("rounded-md shrink-0 p-3", {
  variants: {
    variant: {
      default: "bg-blue-200/20",
      success: "bg-emerald-200/20",
      danger: "bg-rose-200/20",
      warning: "bg-yellow-200/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariant = cva("size-6", {
  variants: {
    variant: {
      default: "fill-blue-400",
      success: "fill-emerald-400",
      danger: "fill-rose-400",
      warning: "fill-yellow-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BoxVariant = VariantProps<typeof boxVariant>;
type IconVariant = VariantProps<typeof iconVariant>;

interface DataCardProps extends BoxVariant, IconVariant {
  icon: IconType;
  title: string;
  value?: number;
  dateRange: string;
  percentChange?: number;
}

const DataCard = ({
  icon: Icon,
  title,
  value = 0,
  dateRange,
  percentChange = 0,
  variant,
}: DataCardProps) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {dateRange}
          </CardDescription>
        </div>
        <div className={cn(boxVariant({ variant }))}>
          <Icon className={cn(iconVariant({ variant }))} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-xl mb-2 line-clamp-1 break-all">
          <CountUp
            preserveValue
            start={0}
            end={value}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formatCurrency}
          />
        </h1>
        <p
          className={cn(
            "text-muted-foreground text-sm line-clamp-1",
            percentChange > 0 && "text-emerald-400",
            percentChange < 0 && "text-rose-400"
          )}
        >
          {FormatPercent(percentChange, {addPrefix: true})} from last period
        </p>
      </CardContent>
    </Card>
  );
};

export default DataCard;


export const DataCardLoading = () => {
    return (
        <Card className="border-none drop-shadow-sm h-[192px]">
            <CardHeader className="flex flex-row items-center justify-center gap-x-4">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="size-12" />
            </CardHeader>
            <CardContent>
                <Skeleton className="shrink-0 h-10 w-24 mb-2" />
                <Skeleton className="shrink-0 h-10 w-40" />
            </CardContent>
        </Card>
    )
}