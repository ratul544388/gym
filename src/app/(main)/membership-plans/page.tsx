"use server";

import { PageHeader } from "@/components/page-header";
import { PlusCircle } from "lucide-react";

const MembershipPlanPage = () => {
  return (
    <div className="space-y-3">
      <PageHeader
        label="Membership Plans"
        actionLabel="Add New"
        actionUrl="/membership-plans/new"
      />
    </div>
  );
};

export default MembershipPlanPage;
