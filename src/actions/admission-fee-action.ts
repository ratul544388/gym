"use server";

import * as z from "zod";

import { currentUser } from "@/lib/current-user";

import db from "@/lib/db";
import { isModerator } from "@/lib/utils";
import { AdmissionFeeSchema } from "@/schemas";

export async function createAdmissionFee(
  values?: z.infer<typeof AdmissionFeeSchema>
) {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthenticated" };
  }

  if (!isModerator(user)) {
    return {
      error:
        "Permission Denied: Only administrators or moderators are authorized to perform this operation.",
    };
  }

  const defaultSettings = await db.defaultSettings.findFirst();
  const admissionFee = values?.admissionFee || 0;

  if (!defaultSettings) {
    await db.defaultSettings.create({
      data: {
        admissionFee,
      },
    });
    return { success: "Admission Fee Created!" };
  } else {
    await db.defaultSettings.update({
      where: {
        id: defaultSettings.id,
      },
      data: {
        admissionFee,
      },
    });
    return { success: "Admission Fee Updated!" };
  }
}
