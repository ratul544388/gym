"use server";

import { currentUser } from "@/lib/current-user";

import db from "@/lib/db";
import { getEndDate, isModerator } from "@/lib/utils";
import { MemberSchema } from "@/schemas";
import { Gender } from "@prisma/client";
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import * as z from "zod";

export type OrderBy = "asc" | "desc";
export const getMembers = async ({
  type,
  take,
  page = 1,
  q,
  gender,
  orderby,
  membershipPlan,
}: {
  type?: "TODAY_JOINED" | "THIS_MONTH_JOINED" | "TODAY_RENEWED";
  take?: number;
  page?: number;
  q?: string;
  gender?: Gender;
  orderby?: OrderBy;
  membershipPlan?: string;
} = {}) => {
  const today = new Date();
  const skip = (page - 1) * (take || 0);

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
        : membershipPlan
        ? {
            membershipPlan: {
              name: {
                equals: membershipPlan,
                mode: "insensitive",
              },
            },
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
    ...(take ? { take } : {}),
    skip,
  });

  return members;
};

export async function createMember({
  values,
  membershipPlanId,
}: {
  values: z.infer<typeof MemberSchema>;
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

  const existingEmail = await db.member.findFirst({
    where: {
      email: values.email,
    },
  });

  if (values.email && existingEmail) {
    return { error: "Email already exists" };
  }

  const existingPhone = await db.member.findUnique({
    where: {
      phone: values.phone,
    },
  });

  if (existingPhone) {
    return { error: "Phone number already exists" };
  }

  const membershipPlan = await db.membershipPlan.findUnique({
    where: {
      id: membershipPlanId,
    },
  });

  if (!membershipPlan) {
    return { error: "Membership plan not found" };
  }

  const admissionFee =
    (await db.defaultSettings.findFirst().then((res) => res?.admissionFee)) ||
    0;

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + membershipPlan.durationInMonth);

  const cost = membershipPlan.price + admissionFee;

  const member = await db.member.create({
    data: {
      ...values,
      startDate,
      endDate,
      cost,
      membershipPlanId,
      ...(isModerator(user) ? { isPaid: true } : { email: user.email }),
    },
  });

  return {
    success: isModerator(user) ? "Member Created Successfully!" : "Success",
    memberId: member.id,
  };
}

export async function updateMember({
  values,
  memberId,
}: {
  values: z.infer<typeof MemberSchema>;
  memberId: string;
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

  const member = await db.member.findUnique({
    where: {
      id: memberId,
    },
    include: {
      membershipPlan: true,
    },
  });

  if (!member) {
    return { error: "Member not found" };
  }

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + member.membershipPlan.durationInMonth);

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

export async function deleteMember({
  memberId,
  saveRevenue,
}: {
  memberId: string;
  saveRevenue: boolean;
}) {
  const user = await currentUser();

  if (!isModerator(user)) {
    return {
      error:
        "Permission Denied: Only administrators or moderators are authorized to perform this operation.",
    };
  }

  if (saveRevenue) {
    const defaultSettings = await db.defaultSettings.findFirst();
    if (!defaultSettings) {
      return { error: "Default settings not found" };
    }

    const member = await db.member.findUnique({
      where: {
        id: memberId,
      },
      include: { renews: true },
    });

    if (!member) {
      return { error: "Member not found!" };
    }

    const renewCosts = member.renews.reduce((total, renew) => {
      return total + renew.cost;
    }, 0);

    const revenueFormMember = member.cost + renewCosts;

    await db.defaultSettings.update({
      where: {
        id: defaultSettings.id,
      },
      data: {
        savedRevenue: defaultSettings.savedRevenue + revenueFormMember,
      },
    });
  }

  await db.member.delete({
    where: {
      id: memberId,
    },
  });

  return { success: "Member Deleted!" };
}

export async function approveMember(memberId: string) {
  const user = await currentUser();

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
      isPaid: true,
    },
  });

  return { success: "Success!" };
}
