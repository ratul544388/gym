"use server";

import { currentUser } from "@/lib/current-user";

import db from "@/lib/db";
import { getEndingDate, isModerator } from "@/lib/utils";
import * as z from "zod";

export async function createAdmissionFee(admissionFee: number) {
  if (!admissionFee) {
    return { error: "Admission fee is required" };
  }

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

  await db.defaultSettings.create({
    data: {
      admissionFee: 500,
    },
  });

  return { success: "Admission Fee Created!" };
}

export async function updateAdmissionFee(admissionFee: number) {
  if (!admissionFee) {
    return { error: "Admission Fee is required" };
  }

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

  if (!defaultSettings) {
    return { error: "Default settings not found." };
  }

  await db.defaultSettings.update({
    where: {
      id: defaultSettings.id,
    },
    data: {
      admissionFee,
    },
  });

  return { success: "Admission Fee updated!" };
}
