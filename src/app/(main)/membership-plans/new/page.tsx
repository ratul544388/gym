import { MembershipPlanForm } from "@/components/forms/membership-plan-form";
import { PageHeader } from "@/components/page-header";
import db from "@/lib/db";

const Page = async () => {
  const membershipBenefits = await db.benefit.findMany();

  return (
    <div className="space-y-3">
      <PageHeader label="New" />
      <MembershipPlanForm membershipBenefits={membershipBenefits} />
    </div>
  );
};

export default Page;
