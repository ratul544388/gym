"use client";
import { useRoutes } from "@/hooks/use-routes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export const SidebarLinks = ({
  className,
  layoutId = "desktopSidebar",
  isAdmin,
  onOpenChange,
}: {
  layoutId?: string;
  className?: string;
  isAdmin: boolean;
  onOpenChange?: () => void;
}) => {
  const routes = useRoutes({ isAdmin });
  return (
    <nav className={cn(className)}>
      {routes.map((route) => (
        <Link
          onClick={() => onOpenChange?.()}
          href={route.href}
          key={route.href}
          className={cn(
            "relative flex items-center gap-3 pl-10 py-3 hover:bg-primary/5 transition-all font-medium text-foreground/80",
            route.active && "font-semibold text-primary bg-primary/5"
          )}
        >
          <route.icon className="h-5 w-5" />
          {route.label}
          {route.active && (
            <motion.span
              layoutId={layoutId}
              className="absolute h-full right-0 bg-primary w-1.5 rounded-full"
            />
          )}
        </Link>
      ))}
    </nav>
  );
};
