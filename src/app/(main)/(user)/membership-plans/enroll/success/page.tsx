import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/current-user";
import db from "@/lib/db";
import { formatMonth } from "@/lib/utils";
import { CheckCircle, CheckCircle2 } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import React from "react";

const SuccessPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  if (!user) {
    redirect("/auth/login");
  }

  const member = await db.member.findUnique({
    where: {
      email: user.email,
      isPaid: false,
    },
    include: {
      membershipPlan: true,
    },
  });

  if (!member) {
    redirect("/dashboard");
  }

  const membershipPlan = await db.membershipPlan.findUnique({
    where: {
      id: searchParams.plan_id,
    },
  });

  const defaultSettings = await db.defaultSettings.findFirst();

  if (!membershipPlan || !defaultSettings?.admissionFee) {
    notFound();
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="dark:bg-secondary/50 border rounded-xl p-6 space-y-6 shadow-xl">
        <h1 className="font-semibold text-3xl text-green-500">
          Enroll Successful!
        </h1>
        <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-2">
          <p className="text-muted-foreground font-medium">Membership Plan</p>
          <p className="font-medium text-end">{membershipPlan?.name}</p>
          <p className="text-muted-foreground font-medium">Duration</p>
          <p className="font-medium text-end">
            {membershipPlan.durationInMonth}{" "}
            {formatMonth(membershipPlan.durationInMonth)}
          </p>
          <p className="text-muted-foreground font-medium">Price</p>
          <p className="font-medium text-end">{membershipPlan.price}৳</p>
          <p className="text-muted-foreground font-medium">Admission Fee</p>
          <p className="font-medium text-end">
            {defaultSettings?.admissionFee}৳
          </p>
        </div>
        <div className="flex justify-between gap-4">
          <Button>Cancel Admission</Button>
          <Button>Go to Dashboard</Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
