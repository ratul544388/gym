import { getMembershipPlans } from "@/actions/membership-plans-action";
import { MemberForm } from "@/components/forms/member-form";
import { PageHeader } from "@/components/page-header";
import { currentUser } from "@/lib/current-user";
import db from "@/lib/db";
import { isModerator } from "@/lib/utils";
import { redirect } from "next/navigation";

const NewMember = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const membershipPlans = await getMembershipPlans();
  const user = await currentUser();

  const selectedPlan =
    membershipPlans.find((plan) => plan.id === searchParams.selected_plan) ||
    membershipPlans[0];

  const defaultSettings = await db.defaultSettings.findFirst();

  if (!selectedPlan || !defaultSettings) {
    redirect("/admin/membership-plans/new");
  }

  return (
    <div className="space-y-3">
      <PageHeader label="New" />
      <MemberForm
        admissionFee={defaultSettings.admissionFee}
        membershipPlans={membershipPlans}
        selectedPlan={selectedPlan}
        isModerator={isModerator(user)}
      />
    </div>
  );
};

export default NewMember;
