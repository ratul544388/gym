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
import { MemberSchema } from "@/schemas";
import { motion } from "framer-motion";
import { useTransition } from "react";
import { CardWrapper } from "../card-wrapper";
import { DatePicker } from "../date-picker";
import { MembershipPlanPicker } from "../membership-plan-picker";
import { MembershipPlan } from "@prisma/client";

export const MemberForm = ({
  membershipPlans,
  selectedPlan,
}: {
  membershipPlans: MembershipPlan[];
  selectedPlan: MembershipPlan;
}) => {
  const [isPending, startTranistion] = useTransition();
  const FramerButton = motion(Button);
  const form = useForm<z.infer<typeof MemberSchema>>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: undefined,
      joiningDate: undefined,
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof MemberSchema>) {
    console.log(values);
  }
  return (
    <CardWrapper>
      <MembershipPlanPicker
        membershipPlans={membershipPlans}
        selectedPlan={selectedPlan}
      />
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
                    placeholder="John wick"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (optional)</FormLabel>
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
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="01*********" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your age"
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
            name="joiningDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enrollment Date</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your age" {...field} type="file" />
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
