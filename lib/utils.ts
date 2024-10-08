import { clsx, type ClassValue } from "clsx";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ConvertAmountFromMiliunits(amount: number) {
  return amount / 1000;
}

export function ConvertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
}

export function formatCurrency(value:number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2
  }).format(value)
}

export function calculatePercentageChange(current: number, previous: number) {
  if(previous === 0) {
    return previous === current ? 0 : 100
  }

  return ((current - previous) / previous) * 100
}

export function fillMissingDays(activeDays: {
  date: Date,
  income: number,
  expenses: number
}[], startDate: Date, endDate: Date) {

  if(activeDays.length === 0) {
    return []
  }

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  })

  const transactionByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day))
    
    if(found) {
      return found
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0 
      }
    }
  
  })

  return transactionByDay

}

type FormatDateRangeProps = {
  from: string | Date | undefined
  to: string | Date | undefined
}

export const formatDateRange = (period?: FormatDateRangeProps) => {
  const defaultTo = new Date()
  const defaultFrom = subDays(defaultTo, 30)

  if(!period?.from) {
    return `${format(defaultFrom, "LLL dd")} - ${format(defaultTo, "LLL dd, y")}`
  }

  if(period.to) {
    return `${format(period.from, "LLL dd")} - ${format(period.to, "LLL dd, y")}`
  }

  return format(period.from, "LLL dd, y")


}

export function FormatPercent (value: number, option: {addPrefix?: boolean} = {addPrefix: false}) {
  const res = new Intl.NumberFormat("en-US", {
    style: "percent"
  }).format( value / 1000)

  if(option.addPrefix && value > 0) {
    return `+ ${res}`
  } 

  return res
}