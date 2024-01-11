"use server";

import { currentUser } from "@/lib/current-user";

import db from "@/lib/db";
import { isModerator } from "@/lib/utils";

export async function renewMember({
  membershipPlanId,
  memberId,
  endDate,
  cost,
}: {
  membershipPlanId: string;
  memberId: string;
  endDate: Date;
  cost: number;
}) {
  const user = await currentUser();

  if (!membershipPlanId || !memberId || !endDate || !cost) {
    return {
      error: "Membership plan ID or member ID or End Date or Cost is missing",
    };
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
          cost,
        },
      },
    },
  });

  return { success: "Member was renewed!" };
}
