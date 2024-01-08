"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";

interface SidebarLinkProps {
  label: string;
  icon: LucideIcon;
  href: string;
  active: boolean;
  layoutId: string;
}

export const SidebarLink = ({
  label,
  icon: Icon,
  href,
  active,
  layoutId = "test",
}: SidebarLinkProps) => {
  const animation = useAnimation();
  const MotionIcon = motion(Icon);

  const handleClick = () => {
    animation.start("rotate");
  };
  return (
    <Link
      onClick={handleClick}
      href={href}
      key={href}
      className={cn(
        "relative flex items-center gap-3 pl-10 py-3 hover:bg-primary/5 transition-all font-medium text-muted-foreground",
        active && "font-semibold text-foreground"
      )}
    >
      <MotionIcon
        animate={animation}
        initial={{ rotate: 0 }}
        variants={{ rotate: { rotate: [0, -30, 0, 30, 0] } }}
        transition={{ duration: 0.8 }}
        className="h-5 w-5"
      />
      {label}
      {active && (
        <motion.span
          layoutId={layoutId}
          className="absolute h-full right-0 bg-primary w-1.5 rounded-full"
        />
      )}
    </Link>
  );
};
