"use server";

import { currentUser } from "@/lib/current-user";
import db from "@/lib/db";
import { AnswerSchema, FaqSchema, QuestionSchema } from "@/schemas";
import * as z from "zod";

export async function createFaq(values: z.infer<typeof FaqSchema>) {
  const user = await currentUser();

  const validatedFields = FaqSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid field" };
  }

  if (!user?.isAdmin) {
    return { error: "Only Admin or Moderators are allowed do this action" };
  }

  await db.faq.create({
    data: {
      ...values,
      isSelected: true,
    },
  });

  return { success: "Faq Created" };
}

export async function updateFaq({
  values,
  faqId,
}: {
  values: z.infer<typeof FaqSchema>;
  faqId: string;
}) {
  const user = await currentUser();

  const validatedFields = FaqSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid field" };
  }

  if (!faqId) {
    return { error: "Id is required" };
  }

  if (!user?.isAdmin) {
    return { error: "Only Admin or Moderators are allowed do this action" };
  }

  await db.faq.update({
    where: {
      id: faqId,
    },
    data: {
      ...values,
    },
  });

  return { success: "Faq Updated" };
}

export async function deleteFaq(faqId: string) {
  const user = await currentUser();

  if (!faqId) {
    return { error: "Id is required" };
  }

  if (!user?.isAdmin) {
    return { error: "Only Admin or Moderators are allowed do this action" };
  }

  await db.faq.delete({
    where: {
      id: faqId,
    },
  });

  return { success: "Faq Deleted" };
}

export async function createQuestion(values: z.infer<typeof QuestionSchema>) {
  const user = await currentUser();

  const validatedFields = QuestionSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid field" };
  }

  if (!user) {
    return { error: "Unauthenticated" };
  }

  await db.faq.create({
    data: {
      ...values,
      userId: user.id,
    },
  });

  return { success: "Question submitted" };
}

export async function updateQuestion({
  values,
  questionId,
}: {
  values: z.infer<typeof QuestionSchema>;
  questionId: string;
}) {
  const user = await currentUser();

  const validatedFields = QuestionSchema.safeParse(values);

  if (!questionId) {
    return { error: "Id is required" };
  }

  if (!validatedFields) {
    return { error: "Invalid field" };
  }

  if (!user) {
    return { error: "Unauthenticated" };
  }

  await db.faq.update({
    where: {
      id: questionId,
    },
    data: {
      ...values,
    },
  });

  return { success: "Question Updated" };
}

export async function deleteQuestion(questionId: string) {
  const user = await currentUser();

  if (!questionId) {
    return { error: "Id is required" };
  }

  if (!user) {
    return { error: "Unauthenticated" };
  }

  await db.faq.delete({
    where: {
      id: questionId,
    },
  });

  return { success: "Question Deleted" };
}

export async function createAnswer({
  values,
  questionId,
}: {
  values: z.infer<typeof AnswerSchema>;
  questionId: string;
}) {
  const user = await currentUser();

  const validatedFields = AnswerSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid field" };
  }

  if (!user) {
    return { error: "Unauthenticated" };
  }

  if (!questionId) {
    return { error: "Question Id is required" };
  }

  await db.faq.update({
    where: {
      id: questionId,
    },
    data: {
      ...values,
    },
  });

  return { success: "Answer Submitted" };
}

export async function updateAnswer({
  values,
  questionId,
}: {
  values: z.infer<typeof AnswerSchema>;
  questionId: string;
}) {
  const user = await currentUser();

  const validatedFields = AnswerSchema.safeParse(values);

  if (!questionId) {
    return { error: "Id is required" };
  }

  if (!validatedFields) {
    return { error: "Invalid field" };
  }

  if (!user) {
    return { error: "Unauthenticated" };
  }

  await db.faq.update({
    where: {
      id: questionId,
    },
    data: {
      ...values,
    },
  });

  return { success: "Answer Updated" };
}
