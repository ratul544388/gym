import { getMembershipPlans } from "@/actions/membership-plans-action";
import { RenewMemberForm } from "@/components/forms/renew-member-form";
import { PageHeader } from "@/components/page-header";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";

const RenewMemberPage = async ({
  params,
  searchParams,
}: {
  params: { member_id: string };
  searchParams: { selected_plan: string | undefined };
}) => {
  const member = await db.member.findUnique({
    where: {
      id: params.member_id,
    },
    include: {
      membershipPlan: true,
      renews: true,
    },
  });

  if (!member) {
    notFound();
  }

  const membershipPlans = await getMembershipPlans();

  const selectedPlan =
    membershipPlans.find((plan) => plan.id === searchParams.selected_plan) ||
    member.membershipPlan;

  const defaultSettings = await db.defaultSettings.findFirst();

  if (!selectedPlan || !defaultSettings?.admissionFee) {
    redirect("/members");
  }

  return (
    <div className="space-y-3">
      <PageHeader label="Renew Member" />
      <RenewMemberForm
        member={member}
        membershipPlans={membershipPlans}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default RenewMemberPage;
