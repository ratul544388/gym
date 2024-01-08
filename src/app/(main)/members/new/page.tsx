import db from "@/lib/db";
import { NewMemberClient } from "./new-member-client";

const NewMember = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const membershipPlans = await db.membershipPlan.findMany({
    orderBy: {
      price: "asc",
    },
  });

  const selectedPlanId = searchParams.selected_plan;
  const selectedPlan =
    membershipPlans.find((plan) => plan.id === searchParams.selected_plan) ||
    membershipPlans[0];

  return (
    <NewMemberClient
      membershipPlans={membershipPlans}
      selectedPlan={selectedPlan}
    />
  );
};

export default NewMember;
