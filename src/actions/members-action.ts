"use server";

import { currentUser } from "@/lib/current-user";

import db from "@/lib/db";
import { getEndingDate } from "@/lib/utils";
import { MemberSchema } from "@/schemas";
import * as z from "zod";

export const getMembers = async () => {
  const members = await db.member.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      membershipPlan: true,
      // renews: true,
    },
  });

  return members;
};

export async function createMember({
  values,
  endDate,
  membershipPlanId,
}: {
  values: z.infer<typeof MemberSchema>;
  endDate: Date;
  membershipPlanId: string;
}) {
  const validatedFields = MemberSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const user = await currentUser();

  const isModerator =
    user && (user.role === "ADMIN" || user.role === "MODERATOR");

  if (!isModerator) {
    return {
      error:
        "Permission Denied: Only administrators or moderators are authorized to perform this operation.",
    };
  }

  await db.member.create({
    data: {
      ...validatedFields.data,
      endDate,
      membershipPlanId,
    },
  });

  return { success: "Member Created Successfully!" };
}

export async function updateMember({
  values,
  memberId,
  endDate,
}: {
  values: z.infer<typeof MemberSchema>;
  memberId: string;
  endDate: Date;
}) {
  const validatedFields = MemberSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const user = await currentUser();

  const isModerator =
    user && (user.role === "ADMIN" || user.role === "MODERATOR");

  if (!isModerator) {
    return {
      error:
        "Permission Denied: Only administrators or moderators are authorized to perform this operation.",
    };
  }

  if (!memberId) {
    return { error: "Member ID is required" };
  }

  await db.member.update({
    where: {
      id: memberId,
    },
    data: {
      ...validatedFields.data,
      endDate,
    },
  });

  return { success: "Member updated!" };
}

export async function deleteMember(memberId: string) {
  const user = await currentUser();

  const isModerator =
    user && (user.role === "ADMIN" || user.role === "MODERATOR");

  if (!isModerator) {
    return {
      error:
        "Permission Denied: Only administrators or moderators are authorized to perform this operation.",
    };
  }

  await db.member.delete({
    where: {
      id: memberId,
    },
  });

  return { success: "New Benefit Added!" };
}
