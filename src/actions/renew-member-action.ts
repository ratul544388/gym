"use server";

import { currentUser } from "@/lib/current-user";

import db from "@/lib/db";
import { isModerator } from "@/lib/utils";

export async function renewMember({
  membershipPlanId,
  memberId,
  endDate,
}: {
  membershipPlanId: string;
  memberId: string;
  endDate: Date;
}) {
  const user = await currentUser();

  if (!membershipPlanId || !memberId || !endDate) {
    return { error: "Membership plan ID or member ID or End Date is missing" };
  }

  if (!user) {
    return { error: "Unauthenticated" };
  }

  if (!isModerator(user)) {
    return {
      error:
        "Permission Denied: Only administrators or moderators are authorized to perform this operation.",
    };
  }

  await db.member.update({
    where: {
      id: memberId,
    },
    data: {
      endDate,
      renews: {
        create: {
          membershipPlanId,
        },
      },
    },
  });

  return { success: "Member was renewed!" };
}
