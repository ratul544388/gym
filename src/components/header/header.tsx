"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { User } from "@prisma/client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../logo";
import MaxWidthWrapper from "../max-width-wrapper";
import { MobileSidebar } from "../sidebar/mobile-sidebar";
import { ThemeToggler } from "../theme-toggler";
import { buttonVariants } from "../ui/button";
import { AdminAndUserSwitcher } from "./admin-and-user-switcher";

export const Header = ({ user }: { user: User | null }) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const baseTheme = theme === "dark" ? dark : undefined;
  const isLoginPage = pathname === "/auth/sign-in";
  const isAdmin = !!user?.isAdmin;

  return (
    <header className="sticky z-50 top-0 inset-x-0 border-b shadow-md">
      <div className="fixed inset-x-0 top-0 h-[75px] bg-background -z-10 border-b" />
      <MaxWidthWrapper className="flex w-full bg-background items-center justify-between h-[75px]">
        <div className="flex items-center gap-4">
          <MobileSidebar user={user} />
          <Logo isAdmin={isAdmin} />
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <AdminAndUserSwitcher
              isAdmin={isAdmin}
              className="hidden md:flex"
            />
          )}
          <ThemeToggler className="hidden xs:flex" />
          {user ? (
            <div className="w-[32px]">
              <UserButton afterSignOutUrl="/" appearance={{ baseTheme }} />
            </div>
          ) : (
            <Link
              href={isLoginPage ? "/auth/sign-up" : "/auth/sign-in"}
              className={buttonVariants()}
            >
              {isLoginPage ? "Sign up" : "Log in"}
            </Link>
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
