"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { DotIcon, EditIcon, MoreHorizontal, TrashIcon } from "lucide-react";
import React from "react";
import { useOpenAccount } from "../../../features/accounts/hooks/useOpenAccount";
import { useDeleteAccount } from "@/features/accounts/api/useDeleteAccount";
import { UseConfirm } from "@/hooks/UseConfirm";

type ActionsProps = {
  id: string;
};

const Actions: React.FC<ActionsProps> = ({ id }) => {
  const deleteMutation = useDeleteAccount(id);
  const [ConfirmDialog, confirm] = UseConfirm(
    "Are you sure you want to Delete it ?",
    "Please note, you are about to initiate a bulk deletion."
  );

  const { onOpen } = useOpenAccount();
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
