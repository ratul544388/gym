"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { User2, UserPlus, UserPlus2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const AuthModal = () => {
  const { isOpen, type, onClose } = useModal();
  const router = useRouter();

  return (
    <Dialog
      open={isOpen && type === "AUTH_MODAL"}
      onOpenChange={() => onClose()}
    >
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Login or Create a new Accont</DialogTitle>
          <DialogDescription>
            This continue the action you must be log in or create a new accont.
          </DialogDescription>
        </DialogHeader>
        <div
          className="flex gap-5 mt-5"
          onClick={() => {
            router.push("/auth/sign-up?redirect_url=faq?q=my-query");
            onClose();
          }}
        >
          <Button variant="outline" className="w-full">
            <UserPlus2 className="h-4 w-4 mr-2" />
            Sign up
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              router.push("/auth/sign-in?redirect_url=faq?q=my-query");
              onClose();
            }}
          >
            <User2 className="h-4 w-4 mr-2" />
            Log in
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
