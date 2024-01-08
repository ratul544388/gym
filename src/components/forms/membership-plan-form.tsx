"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { MembershipPlanSchema } from "@/schemas";
import { motion } from "framer-motion";
import { useTransition } from "react";
import { CardWrapper } from "../card-wrapper";
import { createMembershipPlan } from "@/actions/membership-plans";
import { toast } from "sonner";

export const MembershipPlanForm = () => {
  const [isPending, startTranistion] = useTransition();
  const FramerButton = motion(Button);
  const form = useForm<z.infer<typeof MembershipPlanSchema>>({
    resolver: zodResolver(MembershipPlanSchema),
    defaultValues: {
      name: "",
      durationInMonth: undefined,
      price: undefined,
      facilities: [],
    },
  });

  function onSubmit(values: z.infer<typeof MembershipPlanSchema>) {
    startTranistion(() => {
      createMembershipPlan(values).then(({ success, error }) => {
        if (success) {
          toast.success(success);
        } else if (error) {
          toast.error(error);
        }
      });
    });
  }
  return (
    <CardWrapper title="Create a new Memberhip Plan">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Basic Plan, Standard Plan etc"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="durationInMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration in Month</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Membership Duration"
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Membership Price"
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="facilities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facilities</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@example.com"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FramerButton className="ml-auto">Submit</FramerButton>
        </form>
      </Form>
    </CardWrapper>
  );
};
