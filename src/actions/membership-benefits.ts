"use server";

import { currentUser } from "@/lib/current-user";
import db from "@/lib/db";
import { MembershipBenefitSchema } from "@/schemas";
import * as z from "zod";

export async function createMembershipBenefit(
  values: z.infer<typeof MembershipBenefitSchema>
) {
  const validatedFields = MembershipBenefitSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const user = await currentUser();

  if (!user || user.role !== "ADMIN") {
    return { error: "Permission denied" };
  }

  await db.benefit.create({
    data: validatedFields.data,
  });

  return { success: "New Benefit Added!" };
}
