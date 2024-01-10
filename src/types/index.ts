import { Benefit, Member, MembershipPlan, Renew } from "@prisma/client";

export type PlanWithBenefits = MembershipPlan & {
  benefits: Benefit[];
};

export type MemberWithPlan = Member & {
  membershipPlan: MembershipPlan;
};

export type MemberWithPlanAndRenew = Member & {
  membershipPlan: MembershipPlan;
  renews: Renew[];
};
