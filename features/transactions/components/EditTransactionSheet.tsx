import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import AccountForm from "./TransactionForm";
import { insertAccountSchema, insertTransactionsSchema } from "@/db/schema";
import { z } from "zod";
import { useGetIndividualTransactions } from "../api/useGetIndividualTransactions";
import { Loader2 } from "lucide-react";
import { useEditTransactions } from "../api/useEditTransactions";
import { useDeleteTransactions } from "../api/useDeleteTransactions";
import { UseConfirm } from "@/hooks/UseConfirm";
import { useOpenTransactions } from "../hooks/useOpenTransactions";
import TransactionForm from "./TransactionForm";
import { useGetCategory } from "@/features/categories/api/useGetCategory";
import { useCreateCategory } from "@/features/categories/api/useCreateCategory";
import { useGetAccount } from "@/features/accounts/api/useGetAccount";
import { useCreateAccount } from "@/features/accounts/api/useCreateAccount";

const formSchema = insertTransactionsSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransactions();
  const [ConfirmDialog, confirm] = UseConfirm(
    "Are you sure you want to Delete it ?",
    "Please note, you are about to initiate a deletion process."
  );

  const transactionQuery = useGetIndividualTransactions(id);
  const editMutation = useEditTransactions(id);
  const deleteMutation = useDeleteTransactions(id);

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

  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending ||
    transactionQuery.isLoading ||
    categoryMutation.isPending ||
    accountsMutation.isPending;
  const isLoading =
    transactionQuery.isLoading ||
    categoryQuery.isLoading ||
    accountsQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
    console.log({ values });
  };

  const defaultValue = transactionQuery.data
    ? {
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        amount: transactionQuery.data.amount.toString(),
        date: transactionQuery.data.date
          ? new Date(transactionQuery.data.date)
          : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader className="my-4">
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>
              Edit your existing transaction here
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin size-8 text-muted-foreground" />
            </div>
          ) : (
            <>
              <TransactionForm
                id={id}
                defaultValues={defaultValue}
                onSubmit={onSubmit}
                onDelete={onDelete}
                disabled={isPending}
                categoryOption={categoryOption}
                onCreateCategory={onCreateCategory}
                accountOption={accountOption}
                onCreateAccount={onCreateAccount}
              />
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditTransactionSheet;
