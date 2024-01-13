"use server";

import { currentUser } from "@/lib/current-user";

import db from "@/lib/db";
import { isModerator } from "@/lib/utils";
import { MemberSchema } from "@/schemas";
import { Gender } from "@prisma/client";
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import * as z from "zod";

export type OrderBy = "asc" | "desc";
export const getMembers = async ({
  type,
  take = 10,
  page = 1,
  q,
  gender,
  orderby,
}: {
  type?: "TODAY_JOINED" | "THIS_MONTH_JOINED" | "TODAY_RENEWED";
  take?: number;
  page?: number;
  q?: string;
  gender?: Gender;
  orderby?: OrderBy;
} = {}) => {
  const today = new Date();
  const skip = (page - 1) * take;

  const members = await db.member.findMany({
    where: {
      ...(type === "TODAY_JOINED"
        ? {
            OR: [
              {
                startDate: {
                  gte: startOfDay(today),
                  lte: endOfDay(today),
                },
              },
              {
                renews: {
                  some: {
                    createdAt: {
                      gte: startOfDay(today),
                      lte: endOfDay(today),
                    },
                  },
                },
              },
            ],
          }
        : type === "THIS_MONTH_JOINED"
        ? {
            OR: [
              {
                startDate: {
                  gte: startOfMonth(today),
                  lte: endOfMonth(today),
                },
              },
              {
                renews: {
                  some: {
                    createdAt: {
                      gte: startOfMonth(today),
                      lte: endOfMonth(today),
                    },
                  },
                },
              },
            ],
          }
        : type === "TODAY_RENEWED"
        ? {
            renews: {
              some: {
                createdAt: {
                  gte: startOfDay(today),
                  lte: endOfDay(today),
                },
              },
            },
          }
        : q
        ? {
            OR: [
              {
                name: {
                  contains: q,
                  mode: "insensitive",
                },
              },
              {
                phone: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            ],
          }
        : gender
        ? {
            gender,
          }
        : {}),
    },
    orderBy: {
      ...(orderby
        ? {
            endDate: orderby,
          }
        : {
            createdAt: "desc",
          }),
    },
    include: {
      membershipPlan: true,
      renews: true,
    },
    take,
    skip,
  });

  return members;
};

export async function createMember({
  values,
  endDate,
  cost,
  membershipPlanId,
}: {
  values: z.infer<typeof MemberSchema>;
  endDate: Date;
  cost: number;
  membershipPlanId: string;
}) {
  const validatedFields = MemberSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const user = await currentUser();

  if (!user) {
    return { error: "Unauthenticated!" };
  }

  const existingEmail = await db.member.findUnique({
    where: {
      email: values.email,
    },
  });

  if (existingEmail) {
    return { error: "Email already exists" };
  }

  const existingPhone = await db.member.findUnique({
    where: {
      phone: values.phone,
    },
  });

  if (existingPhone) {
    return { error: "Email already exists" };
  }

  const totalMembers = await db.member.count();

  await db.member.create({
    data: {
      ...values,
      memberId: totalMembers + 1,
      cost,
      endDate,
      membershipPlanId,
      ...(isModerator(user) ? { isPaid: true } : { email: user.email }),
    },
  });

  return {
    success: isModerator(user) ? "Member Created Successfully!" : "Success",
  };
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

  if (!isModerator(user)) {
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

  if (!isModerator(user)) {
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
