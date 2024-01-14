"use client";

import { createFaq, updateFaq } from "@/actions/faq-action";
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
import { FaqSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Textarea } from "../ui/textarea";

export const FaqModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const [isPending, startTranistion] = useTransition();
  const router = useRouter();
  const { faq } = data;

  const form = useForm<z.infer<typeof FaqSchema>>({
    resolver: zodResolver(FaqSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  useEffect(() => {
    if (faq) {
      form.reset({
        question: faq.question,
        answer: faq.answer as string,
      });
    } else {
      form.reset({
        question: "",
        answer: "",
      });
    }
  }, [form, faq]);

  const onSubmit = (values: z.infer<typeof FaqSchema>) => {
    startTranistion(() => {
      if (faq) {
        updateFaq({ values, faqId: faq.id }).then(({ error, success }) => {
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
      } else {
        createFaq(values).then(({ error, success }) => {
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
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen && type === "FAQ_MODAL"} onOpenChange={handleClose}>
      <DialogContent className="">
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
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write the answer"
                      rows={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="ml-auto" disabled={isPending}>
              {faq ? "Save" : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
