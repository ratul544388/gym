"use client";

import { DeleteBenefitModal } from "@/components/modals/delete-benefit-modal";
import { DeleteMemberModal } from "@/components/modals/delete-member-modal";
import { AdmissionFeeModal } from "@/components/modals/admission-fee-modal";
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
      <DeleteMemberModal />
      <DeleteBenefitModal />
      <AdmissionFeeModal />
    </>
  );
};

export default ModalProvider;
