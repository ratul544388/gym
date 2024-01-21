"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { deleteQuestion } from "@/actions/faq-action";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

export const DeleteQuestionModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { faq } = data;

  if (!faq) {
    return null;
  }

  const onConfirm = () => {
    startTransition(() => {
      deleteQuestion(faq.id).then(({ error, success }) => {
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
      open={isOpen && type === "DELETE_QUESTION_MODAL"}
      onOpenChange={() => onClose()}
    >
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Delete Your Question?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your question parmaneltly. This
            action cannot be undone.
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
