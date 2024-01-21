"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cancelAdmission } from "@/actions/cancel-admission-action";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

export const CancelAdmissionModal = () => {
  const { isOpen, type, onClose } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onConfirm = () => {
    startTransition(() => {
      cancelAdmission().then(({ error, success }) => {
        if (success) {
          toast.success(success);
          onClose();
          router.push("/dashboard");
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
      open={isOpen && type === "CANCEL_ADMISSION_MODAL"}
      onOpenChange={() => onClose()}
    >
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Cancel Admission</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel your admission. This action cannot
            be undone?
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
