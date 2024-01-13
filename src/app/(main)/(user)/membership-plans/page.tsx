import { getMembershipPlans } from "@/actions/membership-plans-action";
import { MembershipPlanCard } from "@/components/membership-plan-card";
import { PageHeader } from "@/components/page-header";
import { currentUser } from "@/lib/current-user";
import { isModerator } from "@/lib/utils";

const MembershipPlanPage = async () => {
  const membershipPlans = await getMembershipPlans();
  return (
    <div className="space-y-3">
      <PageHeader
        label="Membership Plans"
        actionLabel="Add New"
        actionUrl="/membership-plans/new"
      />
      <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 items-center">
        {membershipPlans.map((plan) => (
          <MembershipPlanCard key={plan.id} membershipPlan={plan} />
        ))}
      </section>
    </div>
  );
};

export default MembershipPlanPage;
