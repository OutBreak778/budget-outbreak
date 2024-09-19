"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, MoreHorizontal, TrashIcon } from "lucide-react";
import React from "react";
import { UseConfirm } from "@/hooks/UseConfirm";
import { useDeleteCategory } from "@/features/categories/api/useDeleteCategory";
import { useOpenCategory } from "@/features/categories/hooks/useOpenCategory";

type ActionsProps = {
  id: string;
};

const Actions: React.FC<ActionsProps> = ({ id }) => {

  const deleteMutation = useDeleteCategory(id);
  const [ConfirmDialog, confirm] = UseConfirm(
    "Are you sure you want to Delete it ?",
    "Please note, you are about to initiate a bulk deletion."
  );

  const { onOpen } = useOpenCategory();
  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={"sm"}
            className="text-gray-500 size-5 p-0"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <EditIcon className="size-5 mr-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            <TrashIcon className="size-5 mr-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
