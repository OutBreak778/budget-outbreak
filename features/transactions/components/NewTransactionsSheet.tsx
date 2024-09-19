import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewTransactions } from "../hooks/UseNewTransactions";
import { insertTransactionsSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateTransactions } from "../api/useCreateTransactions";
import { useCreateCategory } from "@/features/categories/api/useCreateCategory";
import { useGetCategory } from "@/features/categories/api/useGetCategory";
import { useGetAccount } from "@/features/accounts/api/useGetAccount";
import { useCreateAccount } from "@/features/accounts/api/useCreateAccount";
import TransactionForm from "./TransactionForm";
import { Loader2 } from "lucide-react";

const formSchema = insertTransactionsSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

const NewTransactionsSheet = () => {
  const { isOpen, onClose } = useNewTransactions();
  const createMutation = useCreateTransactions();

  
  // Category data fetch for every user
  
  const categoryQuery = useGetCategory();
  const categoryMutation = useCreateCategory();
  const onCreateCategory = (name: string) =>
    categoryMutation.mutate({
      name,
    });
    const categoryOption = (categoryQuery.data ?? []).map((item) => ({
      label: item.name,
      value: item.id,
    }));
    
    // Account data fetch for every user
    const accountsQuery = useGetAccount();
    const accountsMutation = useCreateAccount();
    const onCreateAccount = (name: string) =>
      accountsMutation.mutate({
        name,
      });
      const accountOption = (accountsQuery.data ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  }));
  
  const isPending = createMutation.isPending || categoryMutation.isPending || accountsMutation.isPending
  const isLoading = categoryQuery.isLoading || accountsQuery.isLoading

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
    console.log({ values });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className="my-4">
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Create a new transaction</SheetDescription>
        </SheetHeader>
        {
          isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="text-muted-foreground animate-spin size-5" />
            </div>
          ): (
            <TransactionForm
              onSubmit={onSubmit}
              disabled={isPending}
              categoryOption={categoryOption}
              onCreateCategory={onCreateCategory}
              accountOption={accountOption}
              onCreateAccount={onCreateAccount}
            />

          )
        }
      </SheetContent>
    </Sheet>
  );
};

export default NewTransactionsSheet;
