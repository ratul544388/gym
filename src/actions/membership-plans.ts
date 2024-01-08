"use server";

import { currentUser } from "@/lib/current-user";
import db from "@/lib/db";
import { MembershipPlanSchema } from "@/schemas";
import * as z from "zod";

export async function createMembershipPlan(
  values: z.infer<typeof MembershipPlanSchema>
) {
  const validatedFields = MembershipPlanSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const user = await currentUser();

  if (!user || user.role !== "ADMIN") {
    return { error: "Permission denied" };
  }

  const { name, price, durationInMonth, benefitIds } = validatedFields.data;

  const benefitObjects = benefitIds.map((item) => ({
    id: item,
  }));

  await db.membershipPlan.create({
    data: {
      name,
      price,
      durationInMonth,
      benefits: {
        connect: benefitObjects,
      },
    },
  });

  return { success: "Membership Plan Created!" };
}
