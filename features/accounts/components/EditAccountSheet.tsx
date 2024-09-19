import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import AccountForm from "./AccountForm";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccount } from "../api/useCreateAccount";
import { useOpenAccount } from "../hooks/useOpenAccount";
import { useGetIndividualAccount } from "../api/useGetIndividualAccount";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/useEditAccount";
import { useDeleteAccount } from "../api/useDeleteAccount";
import { UseConfirm } from "@/hooks/UseConfirm";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmDialog, confirm] = UseConfirm(
    "Are you sure you want to Delete it ?",
    "Please note, you are about to initiate a deletion process."
  );

  const accountQuery = useGetIndividualAccount(id);
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
    console.log({ values });
  };

  const defaultValue = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: "",
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
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>
              Edit your account name from here
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin size-8 text-muted-foreground" />
            </div>
          ) : (
            <>
              <AccountForm
                id={id}
                onSubmit={onSubmit}
                disabled={isPending}
                defaultValues={defaultValue}
                onDelete={onDelete}
              />
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditAccountSheet;
