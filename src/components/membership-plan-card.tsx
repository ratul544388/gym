"use client";

import { useModal } from "@/hooks/use-modal-store";
import { cn, formatText } from "@/lib/utils";
import { FullMembershipPlan } from "@/types";
import { BadgeCheck, Check, Edit, Trash, Users2 } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Badge } from "./ui/badge";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface MembershipPlanCardProps {
  membershipPlan: FullMembershipPlan;
  isModerator?: boolean;
  currentUser?: User | null;
}

export const MembershipPlanCard = ({
  membershipPlan,
  isModerator,
  currentUser,
}: MembershipPlanCardProps) => {
  const { onOpen } = useModal();
  const router = useRouter();

  const isPurchased =
    currentUser &&
    membershipPlan.members.some(
      (member) => member.email === currentUser?.email
    )

  return (
    <div className="relative flex flex-col p-7 bg-background border dark:border-primary rounded-xl w-full max-w-[500px] mx-auto shadow-lg h-full">
      {isPurchased && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold bg-secondary border border-primary px-4 py-1 rounded-full">
          Your Plan
        </div>
      )}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-3xl bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text">
          {formatText(membershipPlan.name)}
        </h3>
        {isModerator && (
          <Badge variant="secondary">
            <Users2 className="h-4 w-4 mr-2" />
            {membershipPlan.members.length}
          </Badge>
        )}
      </div>
      <div className="mt-3 space-y-3">
        {membershipPlan.benefits.map((benefit) => (
          <div key={benefit.id} className="flex items-center">
            <BadgeCheck className="min-w-[16px] min-h-[16px] h-4 w-4 text-primary mr-2" />
            {benefit.title}
          </div>
        ))}
      </div>
      <div className="flex items-center mt-auto pt-5">
        <span className="font-bold mt-2.5">৳</span>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text">
          {membershipPlan.price}
        </h1>
        <span className="mt-2.5 font-bold">
          /{membershipPlan.durationInMonth} Month
        </span>
      </div>
      <div className="flex items-center w-full gap-5 mt-5">
        {isModerator ? (
          <>
            <Button
              onClick={() =>
                onOpen("DELETE_MEMBERSHIP_PLAN_MODAL", {
                  membershipPlanId: membershipPlan.id,
                })
              }
              variant="destructive"
              className={cn("w-full")}
            >
              <Trash className="h-4 w-4 mr-2 mb-0.5" />
              Delete
            </Button>
            <Link
              href={`/admin/membership-plans/${membershipPlan.id}/edit`}
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              <Edit className="h-4 w-4 mr-2 mb-0.5" />
              Edit
            </Link>
          </>
        ) : (
          <Button
            onClick={() =>
              router.push(
                `/membership-plans/enroll?selected_plan=${membershipPlan.id}`
              )
            }
            disabled={!!isPurchased}
            className={cn(buttonVariants(), "w-full")}
          >
            {isPurchased ? "Already Purchased" : "Purchased Plan"}
          </Button>
        )}
      </div>
    </div>
  );
};
