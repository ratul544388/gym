"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const CancelAdmissionButton = () => {
  const { onOpen } = useModal();
  return (
    <Button
      variant="destructive"
      className="w-full"
      onClick={() => onOpen("CANCEL_ADMISSION_MODAL")}
    >
      Cancel Admission
    </Button>
  );
};
