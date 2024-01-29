"use client";

import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Menu } from "lucide-react";
import { useState } from "react";
import { AdminAndUserSwitcher } from "../header/admin-and-user-switcher";
import { Logo } from "../logo";
import { LogoutButton } from "../logout-button";
import { ThemeToggler } from "../theme-toggler";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SidebarLinks } from "./sidebar-links";

export const MobileSidebar = ({ user }: { user: User | null }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const isAdmin = !!user?.isAdmin;

  return (
    <Sheet open={open} onOpenChange={handleClick}>
      <SheetTrigger
        className={cn(
          "flex md:hidden items-center justify-center h-10 w-10 rounded-md hover:bg-accent transition"
        )}
        onClick={handleClick}
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 pt-3 flex flex-col gap-5">
        <Logo className="ml-10" isAdmin={isAdmin} />
        <SidebarLinks
          layoutId="mobileSidebar"
          isAdmin={isAdmin}
          onOpenChange={() => open && setOpen(false)}
        />
        {user && <AdminAndUserSwitcher isAdmin={isAdmin} className="ml-10" />}
        <div className="mt-auto space-y-3">
          <ThemeToggler className="xs:hidden" /> {user && <LogoutButton />}
        </div>
      </SheetContent>
    </Sheet>
  );
};
