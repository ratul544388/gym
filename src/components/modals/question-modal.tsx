"use client";

import { createQuestion, updateQuestion } from "@/actions/faq-action";
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
import { QuestionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Textarea } from "../ui/textarea";

export const QuestionModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const [isPending, startTranistion] = useTransition();
  const router = useRouter();

  const { faq } = data;

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      question: "",
    },
  });

  useEffect(() => {
    if (faq) {
      form.setValue("question", faq?.question);
    }
  }, [faq, form]);

  const onSubmit = (values: z.infer<typeof QuestionSchema>) => {
    startTranistion(() => {
      if (faq) {
        updateQuestion({ values, questionId: faq.id }).then(
          ({ error, success }) => {
            if (success) {
              toast.success(success);
              onClose();
              form.reset();
              router.refresh();
            } else if (error) {
              toast.error(error);
            } else {
              toast.error("Something went wrong");
            }
          }
        );
      } else {
        createQuestion(values).then(({ error, success }) => {
          if (success) {
            toast.success(success);
            onClose();
            router.refresh();
          } else if (error) {
            toast.error(error);
          } else {
            toast.error("Something went wrong");
          }
        });
      }
    });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog
      open={isOpen && type === "QUESTION_MODAL"}
      onOpenChange={handleClose}
    >
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
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
              {faq ? "Save" : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
