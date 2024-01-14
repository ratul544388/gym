import { currentUser } from "@/lib/current-user";
import { FaqClient } from "./faq-client";
import { isModerator } from "@/lib/utils";
import db from "@/lib/db";

const FAQPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();

  const isAskedQuestions = searchParams.query === "asked_questions";
  const isMyQuestions = searchParams.query === "my_questions";

  const faqs = await db.faq.findMany({
    where: {
      ...(isAskedQuestions
        ? {
            isSelected: false,
          }
        : isMyQuestions
        ? {
            userId: user?.id,
          }
        : {
            isSelected: true,
          }),
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <FaqClient isModerator={isModerator(user)} faqs={faqs} currentUser={user} />
  );
};

export default FAQPage;
