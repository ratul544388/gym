"use client";

import { renewMember } from "@/actions/renew-member-action";
import { Button } from "@/components/ui/button";
import { getEndingDate } from "@/lib/utils";
import {
  MemberWithPlan,
  MemberWithPlanAndRenew,
  PlanWithBenefits,
} from "@/types";
import { MembershipPlan } from "@prisma/client";
import { differenceInDays, format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { CardWrapper } from "../card-wrapper";
import { MembershipPlanPicker } from "../membership-plan-picker";
import { Separator } from "../ui/separator";

export const RenewMemberForm = ({
  membershipPlans,
  selectedPlan,
  member,
}: {
  membershipPlans: PlanWithBenefits[];
  selectedPlan: MembershipPlan;
  member: MemberWithPlanAndRenew;
}) => {
  const [isPending, startTranistion] = useTransition();
  const router = useRouter();
  const FramerButton = motion(Button);

  function onSubmit() {
    const isInvalidMember = () => {
      const difference = differenceInDays(member.endDate, new Date());
      return difference < -30;
    };

    const startDate = isInvalidMember() ? new Date() : member.endDate;
    const endDate = getEndingDate({
      startDate,
      durationInMonth: selectedPlan.durationInMonth,
    });
    const cost = selectedPlan.price;
    startTranistion(() => {
      renewMember({
        memberId: member.id,
        membershipPlanId: member.membershipPlanId,
        endDate,
        cost,
      }).then(({ error, success }) => {
        if (success) {
          toast.success(success);
          router.push("/members");
          router.refresh();
        } else if (error) {
          toast.error(error);
        } else {
          toast.error("Something went wrong");
        }
      });
    });
  }

  const memberDetails = [
    {
      label: "Name",
      value: member.name,
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
      value: !!member.renews.length
        ? format(
            member.renews[member.renews.length - 1].createdAt,
            "d MMMM yyyy"
          )
        : "Null",
    },
    {
      label: "Current Membership Plan",
      value: member.membershipPlan.name,
    },
  ];
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
        <section className="flex flex-col xs:flex-row gap-6 xs:items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground font-semibold">
              Renew Membership Plan:{" "}
              <span className="text-primary">{selectedPlan.name}</span>
            </p>
            <Separator className="h-[1.5px]" />
            <p className="text-muted-foreground font-semibold">
              Cost: <span className="text-primary">{selectedPlan.price}৳</span>
            </p>
          </div>
          <FramerButton
            onClick={onSubmit}
            disabled={isPending}
            whileTap={{ scale: 1.05 }}
            className="ml-auto w-full xs:w-fit"
            type="button"
          >
            Renew
          </FramerButton>
        </section>
      </div>
    </CardWrapper>
  );
};
