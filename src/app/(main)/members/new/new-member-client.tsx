"use client";

import { MemberForm } from "@/components/forms/member-form";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/page-header";

interface NewMemberClientProps {}

export const NewMemberClient = ({}: NewMemberClientProps) => {
  return (
    <div className="space-y-5 pr-0">
      <PageHeader label="New" />
      <MemberForm />
    </div>
  );
};
