"use client";

import { isModerator } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { User } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../logo";
import MaxWidthWrapper from "../max-width-wrapper";
import { MobileSidebar } from "../sidebar/mobile-sidebar";
import { buttonVariants } from "../ui/button";

export const Header = ({ user }: { user: User | null }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/auth/sign-in";
  return (
    <header className="sticky z-50 bg-background top-0 inset-x-0 border-b">
      <MaxWidthWrapper className="py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileSidebar isModerator={isModerator(user)} />
            <Logo />
          </div>
          {user ? (
            <div className="w-[32px]">
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <Link
              href={isLoginPage ? "/auth/sign-up" : "/auth/sign-in"}
              className={buttonVariants({ variant: "default" })}
            >
              {isLoginPage ? "Sign up" : "Log in"}
            </Link>
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
