"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { formatText } from "@/lib/utils";
import { FullMembershipPlan, MemberWithPlanAndRenew } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { MembershipPlan } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { CardWrapper } from "../card-wrapper";
import { MembershipPlanPicker } from "../membership-plan-picker";
import { Separator } from "../ui/separator";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { renewMemberSchema } from "@/schemas";
import * as z from "zod";
import { DatePicker } from "../date-picker";
import { useEffect } from "react";

export const RenewMemberForm = ({
  membershipPlans,
  selectedPlan,
  member,
}: {
  membershipPlans: FullMembershipPlan[];
  selectedPlan: MembershipPlan;
  member: MemberWithPlanAndRenew;
}) => {
  const lastRenew = member.renews[member.renews.length]?.startDate;
  const { onOpen } = useModal();
  const memberDetails = [
    {
      label: "Name",
      value: formatText(member.name),
    },
    {
      label: "Phone",
      value: member.phone,
    },
    {
      label: "Joined",
      value: format(member.startDate, "d MMMM yyyy"),
    },
    {
      label: "Last Renewed",
      value: lastRenew ? format(lastRenew, "d MMMM yyyy") : "No Renewals Yet",
    },
    {
      label: "Current Membership Plan",
      value: formatText(member.membershipPlan.name),
    },
  ];

  const form = useForm<z.infer<typeof renewMemberSchema>>({
    resolver: zodResolver(renewMemberSchema),
    defaultValues: {
      startDate: undefined,
    },
  });

  function onSubmit() {
    onOpen("RENEW_MEMBER_MODAL", {
      memberId: member.id,
      membershipPlanId: selectedPlan.id,
      startDate: form.getValues("startDate"),
    });
  }

  useEffect(() => {
    form.setValue("startDate", lastRenew || member.endDate);
  }, [form, member, lastRenew]);

  return (
    <CardWrapper>
      <MembershipPlanPicker
        membershipPlans={membershipPlans}
        selectedPlan={selectedPlan}
      />
      <div className="flex flex-col gap-8">
        <section className="flex xs:flex-row flex-col xs:items-center gap-6 ">
          <div className="w-[200px] h-[220px] relative border">
            <Image
              src={member.image || "/images/placeholder.jpg"}
              alt="Photo"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-3">
            {memberDetails.map((item) => (
              <div key={item.label}>
                <p className="font-semibold text-muted-foreground">
                  {item.label}:{" "}
                  <span className="text-foreground">{item.value}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Renewal Start</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    You don&apos;t necessarily change the Renewal Start Date for
                    Regular Member.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <section className="flex flex-col xs:flex-row gap-6 xs:items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground font-semibold">
              Renew Membership Plan:{" "}
              <span className="text-primary">
                {formatText(selectedPlan.name)}
              </span>
            </p>
            <Separator className="h-[1.5px]" />
            <p className="text-muted-foreground font-semibold">
              Cost: <span className="text-primary">{selectedPlan.price}৳</span>
            </p>
          </div>
          <Button
            onClick={onSubmit}
            className="ml-auto w-full xs:w-fit"
            type="button"
          >
            Renew
          </Button>
        </section>
      </div>
    </CardWrapper>
  );
};
