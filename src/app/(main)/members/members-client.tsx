"use client";

import { PageHeader } from "@/components/page-header";
import { PlusCircle } from "lucide-react";

interface MembersClientProps {}

export const MembersClient = ({}: MembersClientProps) => {
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
