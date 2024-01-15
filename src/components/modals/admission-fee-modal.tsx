"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { AdmissionFeeSchema } from "@/schemas";
import { Input } from "../ui/input";
import { createAdmissionFee } from "@/actions/admission-fee-action";
import toast from "react-hot-toast";

export const AdmissionFeeModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const [isPending, startTranistion] = useTransition();
  const router = useRouter();
  const { admissionFee } = data;
  const form = useForm<z.infer<typeof AdmissionFeeSchema>>({
    resolver: zodResolver(AdmissionFeeSchema),
    defaultValues: {
      admissionFee: 0,
    },
  });

  useEffect(() => {
    if (admissionFee) {
      form.setValue("admissionFee", admissionFee);
    }
  }, [form, admissionFee]);

  const onSubmit = (values: z.infer<typeof AdmissionFeeSchema>) => {
    startTranistion(() => {
      createAdmissionFee(values).then(({ error, success }) => {
        if (success) {
          toast.success(success);
          onClose();
          router.refresh();
        } else if (error) {
          toast.error(error);
        }
      });
    });
  };

  return (
    <Dialog
      open={isOpen && type === "ADMISSION_FEE_MODAL"}
      onOpenChange={() => onClose()}
    >
      <DialogContent className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="admissionFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admission Fee</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Admission Fee"
                      isPending={isPending}
                      autoFocus
                      value={field.value!}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="ml-auto" disabled={isPending}>
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
