"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  createMembershipBenefit,
  editMembershipBenefit,
} from "@/actions/membership-benefits-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MembershipBenefitSchema } from "@/schemas";
import { Benefit } from "@prisma/client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { CardWrapper } from "../card-wrapper";

export const MembershipBenefitForm = ({
  benefit,
  onChange,
}: {
  benefit?: Benefit;
  onChange: () => void;
}) => {
  const [isPending, startTranistion] = useTransition();
  const router = useRouter();
  const FramerButton = motion(Button);
  const form = useForm<z.infer<typeof MembershipBenefitSchema>>({
    resolver: zodResolver(MembershipBenefitSchema),
    defaultValues: {
      title: benefit?.title || "",
    },
  });

  function onSubmit(values: z.infer<typeof MembershipBenefitSchema>) {
    startTranistion(() => {
      if (benefit) {
        editMembershipBenefit(values, benefit.id).then(({ success, error }) => {
          if (success) {
            toast.success("success");
            form.reset();
            onChange();
            router.refresh();
          } else if (error) {
            toast.error(error);
          }
        });
      } else {
        createMembershipBenefit(values).then(({ success, error }) => {
          if (success) {
            toast.success(success);
            form.reset();
            onChange();
            router.refresh();
          } else if (error) {
            toast.error(error);
          }
        });
      }
    });
  }

  return (
    <CardWrapper className="w-full ml-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Write a Membership Benefit"
                    isPending={isPending}
                    autoFocus
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3 ml-auto">
            <Button
              disabled={isPending}
              variant="ghost"
              onClick={() => onChange()}
              type="button"
            >
              Cancel
            </Button>
            <FramerButton disabled={isPending} whileTap={{ scale: 1.05 }}>
              {benefit ? "Update" : "Create"}
            </FramerButton>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
