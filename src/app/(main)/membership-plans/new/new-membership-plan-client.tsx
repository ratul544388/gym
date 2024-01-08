"use client";

import { MembershipPlanForm } from "@/components/forms/membership-plan-form";
import { PageHeader } from "@/components/page-header";
import { Benefit } from "@prisma/client";

interface NewMembershipPlanClientProps {
  membershipBenefits: Benefit[];
}

export const NewMembershipPlanClient = ({
  membershipBenefits,
}: NewMembershipPlanClientProps) => {
  return (
    <div className="space-y-3">
      <PageHeader label="New" />
      <MembershipPlanForm membershipBenefits={membershipBenefits} />
    </div>
  );
};
