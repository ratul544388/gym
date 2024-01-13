"use client";

import { UserButton } from "@clerk/nextjs";
import { Logo } from "../logo";
import MaxWidthWrapper from "../max-width-wrapper";
import { MobileSidebar } from "../sidebar/mobile-sidebar";
import { ThemeToggler } from "../theme-toggler";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Header = ({ isModerator }: { isModerator: boolean }) => {
  const pathname = usePathname();
  return (
    <header className="sticky z-50 bg-background top-0 inset-x-0 border-b">
      <MaxWidthWrapper className="py-3">
        <div className="flex items-center justify-between">
          <MobileSidebar isModerator={isModerator} />
          <Logo />
          <div className="flex items-center gap-4">
            <ThemeToggler
              className={cn("hidden", pathname === "/" && "flex")}
            />
            <div className="w-[32px]">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
