import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useOpenCategory } from "../hooks/useOpenCategory";
import { useGetIndividualCategory } from "../api/useGetIndividualCategory";
import { Loader2 } from "lucide-react";
import { useEditCategory } from "../api/useEditCategory";
import { useDeleteCategory } from "../api/useDeleteCategory";
import { UseConfirm } from "@/hooks/UseConfirm";
import CategoryForm from "./CategoryForm";

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();
  const [ConfirmDialog, confirm] = UseConfirm(
    "Are you sure you want to Delete it ?",
    "Please note, you are about to initiate a deletion process."
  );

  const categoryQuery = useGetIndividualCategory(id);
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = categoryQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
    console.log({ values });
  };

  const defaultValue = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
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
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>
              Edit your category name from here
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin size-8 text-muted-foreground" />
            </div>
          ) : (
            <>
              <CategoryForm
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

export default EditCategorySheet;
