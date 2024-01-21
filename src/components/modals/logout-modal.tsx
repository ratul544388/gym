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
import { SignOutButton } from "@clerk/nextjs";

export const LogoutModal = () => {
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
      open={isOpen && type === "LOGOUT_MODAL"}
      onOpenChange={() => onClose()}
    >
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Log Out</DialogTitle>
          <DialogDescription>
            Are you sure you want to logout? You can login to your account
            anytime again.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between">
          <Button disabled={isPending} onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <SignOutButton>
            <Button disabled={isPending} onClick={() => router.push("/")}>
              Confirm
            </Button>
          </SignOutButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
