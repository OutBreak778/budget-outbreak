import React from "react";
import CurrencyInput from "react-currency-input-field";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Info, MinusCircleIcon, PlusCircleIcon } from "lucide-react";

type AmountInputProps = {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
};

const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = () => {
    if (!value) {
      return;
    }
    onChange((parseFloat(value) * -1).toString());
  };


  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild className="flex items-center justify-center">
            <Button
              type="button"
              onClick={onReverseValue}
              size="sm"
              variant="outline"
              className={cn(
                "bg-slate-400 p-2 hover:bg-slate-500 absolute rounded-md top-1.5 left-1.5 flex items-center justify-center transition"
                ,isIncome && "bg-emerald-500 text-white hover:bg-emerald-600"
                ,isExpense && "bg-orange-500 text-white hover:bg-orange-600"
            )}
            >
              {!parsedValue && <Info className="size-4 text-white" />}
              {isIncome && <PlusCircleIcon className="size-4 text-white" />}
              {isExpense && <MinusCircleIcon className="size-4 text-white" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Use [+] for income and [-] for expense
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        prefix="₹"
        className="pl-14 flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
        value={value}
        decimalsLimit={2}
        decimalScale={2}
        onValueChange={onChange}
        disabled={disabled}
      />
      <p className="text-xs text-muted-foreground mt-2">
        {isIncome && "This will count as income"}
        {isExpense && "This will count as expense"}
      </p>
    </div>
  );
};

export default AmountInput;
