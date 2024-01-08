"use client";

import { motion, useAnimation } from "framer-motion";
import { ArrowLeft, LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  label: string;
  actionLabel?: string;
  actionIcon?: LucideIcon;
  actionUrl?: string;
  backButtonUrl?: string;
}

export const PageHeader = ({
  label,
  actionLabel,
  actionUrl,
  actionIcon: ActionIcon,
  backButtonUrl,
}: PageHeaderProps) => {
  const router = useRouter();
  const animation = useAnimation();
  const MotionLink = motion(Link);
  const MotionButton = motion(Button);
  const MotionIcon = motion(ActionIcon as LucideIcon);
  const MotionArrowLeft = motion(ArrowLeft);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MotionButton
            onMouseEnter={() => animation.start("scaleBackButton")}
            onMouseLeave={() => animation.start("resetBackButton")}
            variant="ghost"
            size="icon"
            onClick={() =>
              backButtonUrl ? router.push(backButtonUrl) : router.back()
            }
          >
            <MotionArrowLeft
              animate={animation}
              variants={{
                scaleBackButton: { scale: 1.25 },
                resetBackButton: { scale: 1 },
              }}
              className="h-5 w-5"
            />
          </MotionButton>
          <h3 className="text-2xl font-bold">{label}</h3>
        </div>
        {actionLabel && actionUrl && (
          <MotionLink
            onMouseEnter={() => animation.start("scaleUp")}
            onMouseLeave={() => animation.start("scaleDown")}
            whileTap={{ scale: 1.05 }}
            href={actionUrl}
            className={buttonVariants()}
          >
            Add new
            <MotionIcon
              animate={animation}
              variants={{ scaleUp: { scale: 1.4 }, scaleDown: { scale: 1 } }}
              className="ml-2 h-4 w-4"
            />
          </MotionLink>
        )}
      </div>
      <Separator />
    </div>
  );
};
