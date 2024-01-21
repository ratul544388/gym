import { getMembershipPlans } from "@/actions/membership-plans-action";
import { MembershipPlanCard } from "@/components/membership-plan-card";
import { PageHeader } from "@/components/page-header";
import { currentUser } from "@/lib/current-user";

const MembershipPlanPage = async () => {
  const membershipPlans = await getMembershipPlans();
  const user = await currentUser();
  return (
    <div className="space-y-6">
      <PageHeader label="Membership Plans" />
      <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 items-center">
        {membershipPlans.map((plan) => (
          <MembershipPlanCard
            key={plan.id}
            membershipPlan={plan}
            currentUser={user}
          />
        ))}
      </section>
    </div>
  );
};

export default MembershipPlanPage;
