"use client";

import { MembershipPlanForm } from "@/components/forms/membership-plan-form";
import { PageHeader } from "@/components/page-header";
import { PlusCircle } from "lucide-react";

interface MembershipPlansClientProps {}

export const MembershipPlansClient = ({}: MembershipPlansClientProps) => {
  return (
    <div className="space-y-3">
      <PageHeader
        label="Membership Plans"
        actionLabel="Add New"
        actionUrl="/membership-plans/new"
        actionIcon={PlusCircle}
      />
      <MembershipPlanForm />
    </div>
  );
};
