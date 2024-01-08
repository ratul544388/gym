"use client";

import { cn } from "@/lib/utils";
import { Lemon } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface LogoProps {
  className?: string;
}

const font = Lemon({ subsets: ["latin-ext"], weight: "400" });

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        // font.className,
        buttonVariants(),
        "bg-primary w-fit text-white font-bold px-3 py-2 rounded-xl",
        className,
      )}
    >
      AFS
    </Link>
  );
};
