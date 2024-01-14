"use client";

import {
  createAnswer,
  createQuestion,
  updateAnswer,
  updateQuestion,
} from "@/actions/faq-action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useModal } from "@/hooks/use-modal-store";
import { AnswerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { CornerDownRight } from "lucide-react";

export const AnswerModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const [isPending, startTranistion] = useTransition();
  const router = useRouter();

  const { faq } = data;

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  useEffect(() => {
    form.setValue("answer", faq?.answer as string);
  }, [faq, form]);

  if (!faq || !faq.question) {
    return null;
  }

  const onSubmit = (values: z.infer<typeof AnswerSchema>) => {
    startTranistion(() => {
      if (faq.answer) {
        updateAnswer({ values, questionId: faq.id }).then(
          ({ error, success }) => {
            if (success) {
              toast.success(success);
              onClose();
              router.refresh();
            } else if (error) {
              toast.error(error);
            } else {
              toast.error("Something went wrong");
            }
          }
        );
      } else {
        createAnswer({ values, questionId: faq.id }).then(
          ({ error, success }) => {
            if (success) {
              toast.success(success);
              onClose();
              router.refresh();
            } else if (error) {
              toast.error(error);
            } else {
              toast.error("Something went wrong");
            }
          }
        );
      }
    });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen && type === "ANSWER_MODAL"} onOpenChange={handleClose}>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="space-y-2 text-sm">
              <h4 className="font-semibold">Question</h4>
              <div className="flex items-center gap-2">
                <CornerDownRight className="h-4 w-4" />
                {faq.question}
              </div>
            </div>
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write the question"
                      rows={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="ml-auto" disabled={isPending}>
              {faq.answer ? "Save" : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
