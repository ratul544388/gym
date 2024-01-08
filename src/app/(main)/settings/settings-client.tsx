"use client";

import { PageHeader } from "@/components/page-header";
import { MembershipBenefits } from "@/components/settings/membership-benefits";
import { Benefit } from "@prisma/client";
import { TableProperties } from "lucide-react";

interface SettingsClientProps {
  membershipBenefits: Benefit[];
}

export const SettingsClient = ({ membershipBenefits }: SettingsClientProps) => {
  return (
    <div className="space-y-3">
      <PageHeader label="Settings" />
      <section className="flex items-start gap-3 bg-primary/5 p-3 rounded-xl">
        <TableProperties className="h-5 w-5 mt-[18px]" />
        <MembershipBenefits benefits={membershipBenefits} />
      </section>
    </div>
  );
};
