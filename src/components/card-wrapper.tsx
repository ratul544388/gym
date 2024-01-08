"use client";

import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CardWrapperProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const CardWrapper = ({
  children,
  title,
  className,
}: CardWrapperProps) => {
  return (
    <div
      className={cn(
        "max-w-[600px] space-y-5 bg-background mx-auto border p-5 rounded-xl shadow-lg",
        className
      )}
    >
      {title && <h2 className="text-2xl font-bold pt-3">{title}</h2>}
      <div>{children}</div>
    </div>
  );
};
