"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { approveMember } from "@/actions/members-action";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

export const ApproveMemberModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { member } = data;

  if (!member) return null;

  const onConfirm = () => {
    startTransition(() => {
      approveMember(member.id).then(({ error, success }) => {
        if (success) {
          toast.success(success);
          onClose();
          router.refresh();
        } else if (error) {
          toast.success(error);
        } else {
          toast.error("Something went wrong");
        }
      });
    });
  };

  return (
    <Dialog
      open={isOpen && type === "APPROVE_MEMBER_MODAL"}
      onOpenChange={() => onClose()}
    >
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Approve Member</DialogTitle>
          <DialogDescription>
            Member has paid the Money and you want to approve it?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between">
          <Button disabled={isPending} onClick={onClose} variant="ghost">
            Close
          </Button>
          <Button disabled={isPending} onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
