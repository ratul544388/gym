"use client";

import { MemberForm } from "@/components/forms/member-form";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/page-header";
import { MembershipPlan } from "@prisma/client";

interface NewMemberClientProps {
  membershipPlans: MembershipPlan[];
  selectedPlan: MembershipPlan;
}

export const NewMemberClient = ({
  membershipPlans,
  selectedPlan,
}: NewMemberClientProps) => {
  return (
    <div className="space-y-5 pr-0">
      <PageHeader label="New" />
      <MemberForm
        membershipPlans={membershipPlans}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};
