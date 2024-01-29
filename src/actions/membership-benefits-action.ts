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

  if (!user?.isAdmin) {
    return { error: "Permission denied" };
  }

  await db.benefit.create({
    data: validatedFields.data,
  });

  return { success: "New Benefit Added!" };
}

export async function editMembershipBenefit(
  values: z.infer<typeof MembershipBenefitSchema>,
  benefitId: string
) {
  const validatedFields = MembershipBenefitSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  if (!benefitId) {
    return { error: "Benefit ID is missing!" };
  }

  const user = await currentUser();

  if (!user?.isAdmin) {
    return { error: "Permission denied" };
  }

  await db.benefit.update({
    where: {
      id: benefitId,
    },
    data: validatedFields.data,
  });

  return { success: "New Benefit Added!" };
}

export async function deleteMembershipBenefit(benefitId: string) {
  if (!benefitId) {
    return { error: "Benefit ID is missing!" };
  }

  const user = await currentUser();

  if (!user?.isAdmin) {
    return { error: "Permission denied" };
  }

  await db.benefit.delete({
    where: {
      id: benefitId,
    },
  });

  return { success: "Benefit was Deleted!" };
}
