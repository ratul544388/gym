"use client";

import { cn, isModerator } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Logo } from "../logo";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SidebarLinks } from "./sidebar-links";
import { User } from "@prisma/client";
import { LogoutButton } from "../logout-button";

export const MobileSidebar = ({
  currentUser,
}: {
  currentUser: User | null;
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

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
        <Logo className="ml-10" />
        <SidebarLinks
          layoutId="mobileSidebar"
          isModerator={isModerator(currentUser)}
          onOpenChange={() => open && setOpen(false)}
        />
        {currentUser && <LogoutButton />}
      </SheetContent>
    </Sheet>
  );
};
