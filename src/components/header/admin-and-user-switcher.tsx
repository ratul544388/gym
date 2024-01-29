"use client";

import { switchAdminOrUser } from "@/actions/admin-and-user-switcher-action";
import { cn } from "@/lib/utils";
import { ShieldAlert, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "../modals/confirm-modal";
import { Button } from "../ui/button";

interface AdminAndUserSwitcherProps {
  className?: string;
  isAdmin: boolean;
}

export const AdminAndUserSwitcher = ({
  className,
  isAdmin,
}: AdminAndUserSwitcherProps) => {
  const router = useRouter();

  return (
    <ConfirmModal
      title={isAdmin ? "Switch to User Mode" : "Switch to Admin Mode"}
      description="Since this is Demo project anyone can switch between User and Admin."
      confirmFn={switchAdminOrUser}
      onSuccess={() => {
        if (isAdmin) {
          router.push("/");
        }
      }}
    >
      <Button variant="outline" className={cn(className)}>
        {isAdmin ? "Switch to User" : "Switch to Admin"}
        {isAdmin ? (
          <User2 className="h-4 w-4 ml-2 text-destructive" />
        ) : (
          <ShieldAlert className="h-4 w-4 ml-2 text-destructive" />
        )}
      </Button>
    </ConfirmModal>
  );
};
