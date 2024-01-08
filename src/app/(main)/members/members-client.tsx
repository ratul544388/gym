"use client";

import { PageHeader } from "@/components/page-header";
import { MembershipBenefits } from "@/components/settings/membership-benefits";
import { Benefit } from "@prisma/client";
import { PlusCircle } from "lucide-react";

interface MembersClientProps {
  
}

export const MembersClient = () => {
  return (
    <div className="space-y-3">
      <PageHeader
        label="Members"
        actionLabel="Add New"
        actionUrl="/members/new"
        actionIcon={PlusCircle}
      />
    </div>
  );
};
