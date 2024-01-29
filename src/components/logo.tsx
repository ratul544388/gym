"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  isAdmin: boolean;
}

export const Logo = ({ className, isAdmin }: LogoProps) => {
  return (
    <Link
      href={isAdmin ? "/admin/dashboard" : "/"}
      className={cn("relative w-[190px] h-[50px] overflow-hidden", className)}
    >
      <Image
        src="/images/logo-light.png"
        fill
        alt="Logo"
        className="dark:hidden"
      />
      <Image
        src="/images/logo-dark.png"
        fill
        alt="Logo"
        className="hidden dark:block"
      />
    </Link>
  );
};
