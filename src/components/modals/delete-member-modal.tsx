"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { deleteMember } from "@/actions/members-action";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export const DeleteMemberModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isCheckedSaveRevenue, setIsCheckSaveRevenue] = useState(false);

  const { memberId } = data;

  if (!memberId) {
    return null;
  }

  const onConfirm = () => {
    startTransition(() => {
      deleteMember({ memberId, saveRevenue: isCheckedSaveRevenue }).then(
        ({ error, success }) => {
          if (success) {
            toast.success(success);
            onClose();
            router.refresh();
          } else if (error) {
            toast.success(error);
          } else {
            toast.error("Something went wrong");
          }
        }
      );
    });
  };

  return (
    <Dialog
      open={isOpen && type === "DELETE_MEMBER_MODAL"}
      onOpenChange={() => onClose()}
    >
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Delete Member?</DialogTitle>
          <DialogDescription>
            This will parmanently delete the member.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex items-center space-x-2 mt-4 mb-2">
            <Checkbox
              id="terms"
              onCheckedChange={() =>
                setIsCheckSaveRevenue(!isCheckedSaveRevenue)
              }
            />
            <Label htmlFor="terms">
              Save the revenue associated with the member.
            </Label>
          </div>
        </div>
        <div className="flex justify-between">
          <Button disabled={isPending} onClick={onClose} variant="ghost">
            Close
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
