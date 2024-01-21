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
import { motion } from "framer-motion";

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
      form.setValue("question", faq.question);
      form.setValue("answer", faq.answer as string);
    }
  }, [form, faq]);

  const onSubmit = (values: z.infer<typeof FaqSchema>) => {
    startTranistion(() => {
      if (faq) {
        updateFaq({ values, faqId: faq.id }).then(({ error, success }) => {
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
        });
      } else {
        createFaq(values).then(({ error, success }) => {
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
        });
      }
    });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen && type === "FAQ_MODAL"} onOpenChange={handleClose}>
      <DialogContent className="h-[100svh] xs:max-h-[80svh] pt-12">
        <Form {...form}>
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
                      autoFocus={!!!faq}
                      {...field}
                      placeholder="Write the question"
                      rows={2}
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
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="ml-auto" disabled={isPending}>
              {faq ? "Save" : "Create"}
            </Button>
          </motion.form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
