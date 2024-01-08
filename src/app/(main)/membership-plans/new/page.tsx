import db from "@/lib/db";
import React from "react";
import { NewMembershipPlanClient } from "./new-membership-plan-client";

const Page = async () => {
  const membershipBenefits = await db.benefit.findMany();

  return <NewMembershipPlanClient membershipBenefits={membershipBenefits} />;
};

export default Page;
