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
import { useTransition } from "react";
import { deleteMember } from "@/actions/members-action";
import { deleteFaq } from "@/actions/faq-action";

export const DeleteFaqModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { faq } = data;

  if (!faq) {
    return null;
  }

  const onConfirm = () => {
    startTransition(() => {
      deleteFaq(faq.id).then(({ error, success }) => {
        if (success) {
          toast.success(success);
          onClose();
          router.refresh();
        } else if (error) {
          toast.error(error);
        } else {
          toast.error("Something went wrong");
        }
      });
    });
  };

  return (
    <Dialog
      open={isOpen && type === "DELETE_FAQ_MODAL"}
      onOpenChange={() => onClose()}
    >
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Delete the FAQ?</DialogTitle>
          <DialogDescription>
            This will delete the faq parmanetly.
          </DialogDescription>
        </DialogHeader>
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
