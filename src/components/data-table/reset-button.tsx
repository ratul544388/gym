"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export const ResetButton = () => {
  return (
    <Link
      href="/members"
      className={cn(buttonVariants({ variant: "outline" }), "group h-8")}
    >
      Reset
      <X className="h-4 w-4 ml-2 group-hover:scale-[1.4] transition group-hover:text-red-500" />
    </Link>
  );
};
