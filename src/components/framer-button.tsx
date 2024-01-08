"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { motion, useAnimation } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FramerButtonProps {
  label: string;
  variant?: "default" | "ghost";
  icon?: LucideIcon;
}

export const FramerButton = ({
  label,
  variant = "default",
  icon: Icon,
}: FramerButtonProps) => {
  const MotionLink = motion(Link);
  const MotionIcon = motion(Icon as LucideIcon);
  const animation = useAnimation();

  const onMouseEnter = () => {
    animation.start("iconScaling");
  };

  return (
    <MotionLink
      onMouseEnter={onMouseEnter}
      href="/"
      className={cn(buttonVariants({ variant }), "flex gap-3")}
    >
      {label}
      {Icon && (
        <MotionIcon
          animate={animation}
          variants={{ iconScaling: { scale: 1.05 } }}
          className="h-4 w-4"
        />
      )}
    </MotionLink>
  );
};
