import { getMembershipPlans } from "@/actions/membership-plans-action";
import { MemberForm } from "@/components/forms/member-form";
import { PageHeader } from "@/components/page-header";
import db from "@/lib/db";
import { redirect } from "next/navigation";

const NewMember = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const membershipPlans = await getMembershipPlans();

  const selectedPlan =
    membershipPlans.find((plan) => plan.id === searchParams.selected_plan) ||
    membershipPlans[0];

  const defaultSettings = await db.defaultSettings.findFirst();

  if (!selectedPlan || !defaultSettings?.admissionFee) {
    redirect("/membership-plans/new");
  }

  if (!defaultSettings?.admissionFee) {
  }

  return (
    <div className="space-y-3">
      <PageHeader label="New" />
      <MemberForm
        admissionFee={defaultSettings.admissionFee}
        membershipPlans={membershipPlans}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default NewMember;
