import { insertAccountSchema, insertTransactionsSchema } from "@/db/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import SelectComponent from "@/components/SelectComponent";
import DatePicker from "@/components/DatePicker";
import { Textarea } from "@/components/ui/textarea";
import AmountInput from "@/components/AmountInput";
import { ConvertAmountToMiliunits } from "@/lib/utils";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionsSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;
type apiFormValues = z.input<typeof apiSchema>;

type AccountFormProps = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: apiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOption: { label: string; value: string }[];
  categoryOption: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
};

const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOption,
  categoryOption,
  onCreateAccount,
  onCreateCategory,
}: AccountFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    const amount = parseFloat(values.amount)
    const amountInMiliunits = ConvertAmountToMiliunits(amount)
    onSubmit({
      ...values,
      amount: amountInMiliunits
    });
    console.log({ values });
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Account</FormLabel>
              <FormControl>
                <SelectComponent
                  disabled={disabled}
                  placeholder="Select an Account"
                  options={accountOption}
                  onCreate={onCreateAccount}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <SelectComponent
                  disabled={disabled}
                  placeholder="Select an Category"
                  options={categoryOption}
                  onCreate={onCreateCategory}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Add a payee"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput {...field} disabled={disabled} placeholder="0.00" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Add Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  disabled={disabled}
                  placeholder="Add your notes about transaction. (optional)"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Button className="mt-4 w-full" disabled={disabled}>
            {id ? "Save changes" : "Create transaction"}
          </Button>
          {!!id && (
            <Button
              type="button"
              disabled={disabled}
              onClick={handleDelete}
              variant={"outline"}
              className="mt-5 w-full"
            >
              <Trash2Icon className="size-4 mr-4" />
              <p> Delete transaction</p>
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default TransactionForm;
