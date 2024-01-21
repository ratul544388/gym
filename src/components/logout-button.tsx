"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const LogoutButton = () => {
  const { onOpen } = useModal();
  return (
    <Button
      onClick={() => onOpen("LOGOUT_MODAL")}
      variant="outline"
      className="w-full mt-auto rounded-b-none rounded-t-xl py-6 text-base"
      size="lg"
    >
      <LogOut className="h-4 w-4 mr-4" />
      Logout
    </Button>
  );
};
