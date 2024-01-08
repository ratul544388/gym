import { MembershipPlanSchema } from "@/schemas";
import * as z from "zod";

export async function createMembershipPlan(
  values: z.infer<typeof MembershipPlanSchema>
) {
  const validatedFields = MembershipPlanSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Membership Plan Created!" };
}
