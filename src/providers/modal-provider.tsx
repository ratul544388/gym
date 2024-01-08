"use client";

import { MembershipPlanPickerModal } from "@/components/modals/membership-plan-picker-modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <MembershipPlanPickerModal />
    </>
  );
};

export default ModalProvider;
