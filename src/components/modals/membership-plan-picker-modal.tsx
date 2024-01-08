"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs } from "../tabs";
import { Button } from "../ui/button";

const boxVariants = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    delay: 0.5,
    transition: {
      staggerChildren: 0.08,
      type: "tween",
    },
  },
};

const listVariants = {
  hidden: { opacity: 0, y: 10, x: -10 },
  visible: { opacity: 1, y: 0, x: 0 },
};

export const MembershipPlanPickerModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { membershipPlans } = data;
  const MotionButton = motion(Button);
  const router = useRouter();
  const open = isOpen && type === "MEMBERSHIP_PLAN_PICKER_MODAL";
  const searchParams = useSearchParams();

  const selectedPlan =
    membershipPlans?.find(
      (plan) => plan.id === searchParams.get("selected_plan")
    ) || membershipPlans?.[0];

  const handleSelect = (planId: string) => {
    router.push(`/members/new?selected_plan=${planId}`);
    onClose();
  };

  const items = membershipPlans?.map((plan) => ({
    label: plan.name,
    content: (
      <motion.div
        variants={boxVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-1 items-center w-full border rounded-xl shadow p-3 px-5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white"
      >
        <motion.h3
          variants={listVariants}
          className="font-bold text-2xl capitalize"
        >
          {plan.name.toLowerCase()}
        </motion.h3>
        <motion.h3
          variants={listVariants}
          className="text-3xl font-extrabold mt-2"
        >
          {plan.price}৳
        </motion.h3>
        <motion.p variants={listVariants} className="font-semibold text-sm">
          {plan.durationInMonth} months
        </motion.p>
        <div className="flex flex-col gap-2 mt-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              variants={listVariants}
              key={index}
              className="flex items-center gap-3"
            >
              <CheckCircle className="h-4 w-4" />
              <p className="font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </motion.div>
          ))}
        </div>
        <div className="relative w-full h-fit mt-5">
          <MotionButton
            onClick={() => handleSelect(plan.id)}
            variant="outline"
            className="w-full text-black dark:text-foreground font-bold"
          >
            Select Plan
          </MotionButton>
          <motion.span
            initial={{ width: "100%" }}
            animate={{ width: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute h-full top-0 right-0 rounded-md bg-neutral-900 dark:bg-white w-full z-10"
          />
        </div>
      </motion.div>
    ),
  }));

  if (!items) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="px-2 pt-12 xs:px-5 overflow-hidden">
        <Tabs items={items} initialActive={selectedPlan?.name as string} />
      </DialogContent>
    </Dialog>
  );
};
