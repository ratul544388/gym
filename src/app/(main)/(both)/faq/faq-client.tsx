"use client";

import { PageHeader } from "@/components/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Faq, User } from "@prisma/client";
import { motion } from "framer-motion";
import { Edit, MousePointer2, Plus, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface FaqClientProps {
  isAdmin: boolean;
  faqs: (Faq & {
    user: User | null;
  })[];
  currentUser: User | null;
}

export const FaqClient = ({
  isAdmin,
  faqs,
  currentUser,
}: FaqClientProps) => {
  const query = useSearchParams().get("query");
  const router = useRouter();

  const isPopularQuestions =
    query !== "asked_questions" && query !== "my_questions";
  const isMyQuestions = query === "my_questions";
  const isAskedQuestions = query === "asked_questions";
  const { onOpen } = useModal();

  let tabs = [
    {
      label: "Popular Questions",
      href: "/faq?query=popular_questions",
      active: isPopularQuestions,
    },
    {
      label: "My Questions",
      href: "/faq?query=my_questions",
      active: isMyQuestions,
    },
  ];

  if (isAdmin) {
    tabs = [
      {
        label: "Popular Questions",
        href: "/faq?query=popular_questions",
        active: isPopularQuestions,
      },
      {
        label: "Asked Questions",
        href: "/faq?query=asked_questions",
        active: isAskedQuestions,
      },
    ];
  }
  return (
    <div className="space-y-3">
      <PageHeader label="FAQ" />
      <div className="flex flex-col gap-3 items-center w-full">
        <div className="flex items-center border rounded-full w-fit mx-auto">
          {tabs.map(({ label, active, href }) => (
            <Button
              variant="ghost"
              onClick={() => router.push(href)}
              key={label}
              className={cn(
                "rounded-full relative",
                active && "text-white hover:bg-transparent hover:text-white"
              )}
            >
              {label}
              {active && (
                <motion.span
                  layoutId="activeFAQ"
                  className="inset-0 absolute bg-primary rounded-full -z-10"
                />
              )}
            </Button>
          ))}
        </div>
        <div className="space-y-3 w-full">
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline hover:bg-accent px-3 rounded-lg text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-3 text-base">
                  {faq.answer || "No Answer Yet"}
                  <div className="flex items-center justify-end">
                    <Button
                      onClick={() =>
                        onOpen(
                          isAdmin
                            ? isPopularQuestions
                              ? "FAQ_MODAL"
                              : "ANSWER_MODAL"
                            : "QUESTION_MODAL",
                          {
                            faq,
                          }
                        )
                      }
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full",
                        isPopularQuestions && !isAdmin && "hidden"
                      )}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() =>
                        onOpen(
                          isAdmin
                            ? isPopularQuestions
                              ? "DELETE_QUESTION_MODAL"
                              : "DELETE_FAQ_MODAL"
                            : "DELETE_QUESTION_MODAL",
                          { faq }
                        )
                      }
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full",
                        isPopularQuestions && !isAdmin && "hidden"
                      )}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                    {faq.userId && isAdmin && !faq.answer && (
                      <Button
                        onClick={() => onOpen("ANSWER_MODAL", { faq })}
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <MousePointer2 className="h-4 w-4 rotate-[135deg]" />
                      </Button>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
          <Button
            onClick={() =>
              currentUser
                ? isAdmin
                  ? onOpen("FAQ_MODAL")
                  : onOpen("QUESTION_MODAL")
                : onOpen("AUTH_MODAL")
            }
            className="rounded-full p-0 h-14 w-14 fixed bottom-10 right-8 transition"
          >
            <Plus className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </div>
  );
};
