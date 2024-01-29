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
import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { renewMember } from "@/actions/renew-member-action";
import { useConfettiStore } from "@/hooks/use-confetti-store";

export const RenewMemberModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const confetti = useConfettiStore();

  const { memberId, membershipPlanId, startDate } = data;

  if (!memberId || !membershipPlanId || !startDate) return null;

  const onConfirm = () => {
    startTransition(() => {
      renewMember({ memberId, membershipPlanId, startDate }).then(({ error, success }) => {
        if (success) {
          toast.success(success);
          onClose();
          router.push(`/admin/members/${memberId}`);
          router.refresh();
          confetti.onOpen();
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
      open={isOpen && type === "RENEW_MEMBER_MODAL"}
      onOpenChange={() => onClose()}
    >
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Renew Member?</DialogTitle>
          <DialogDescription>
            This action will renew the member.
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
