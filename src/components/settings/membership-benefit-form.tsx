"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createMembershipBenefit } from "@/actions/membership-benefits";
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
import { MembershipPlan } from "@prisma/client";
import { motion } from "framer-motion";
import { useState, useTransition } from "react";
import { CardWrapper } from "../card-wrapper";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const MembershipBenefitForm = ({
  membershipPlans,
}: {
  membershipPlans?: MembershipPlan[];
}) => {
  const [isPending, startTranistion] = useTransition();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const FramerButton = motion(Button);
  const form = useForm<z.infer<typeof MembershipBenefitSchema>>({
    resolver: zodResolver(MembershipBenefitSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof MembershipBenefitSchema>) {
    startTranistion(() => {
      createMembershipBenefit(values).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          form.reset();
          setIsAdding(false);
          router.refresh();
        } else if (error) {
          toast.error(error);
        }
      });
    });
  }
  return isAdding ? (
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
              onClick={() => setIsAdding(false)}
              type="button"
            >
              Cancel
            </Button>
            <FramerButton disabled={isPending} whileTap={{ scale: 1.05 }}>
              Create
            </FramerButton>
          </div>
        </form>
      </Form>
    </CardWrapper>
  ) : (
    <Button onClick={() => setIsAdding(true)} className="ml-auto">
      Add new
    </Button>
  );
};
