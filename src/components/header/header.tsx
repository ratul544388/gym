"use client";

import { UserButton } from "@clerk/nextjs";
import { Logo } from "../logo";
import MaxWidthWrapper from "../max-width-wrapper";
import { ThemeToggler } from "../theme-toggler";
import { MobileSidebar } from "../sidebar/mobile-sidebar";

export const Header = () => {
  return (
    <header className="sticky z-50 bg-background top-0 inset-x-0 border-b">
      <MaxWidthWrapper className="py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileSidebar />
            <Logo />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggler />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
