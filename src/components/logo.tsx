"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn('', className)}>
      <Image
        src="/images/logo-light.png"
        width={180}
        height={30}
        alt="Logo"
        className="dark:hidden"
      />
      <Image
        src="/images/logo-dark.png"
        width={180}
        height={30}
        alt="Logo"
        className="hidden dark:block"
      />
    </Link>
  );
};
