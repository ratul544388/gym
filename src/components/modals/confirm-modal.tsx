import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { ReactNode, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

interface ConfirmModalProps {
  children: ReactNode;
  title: string;
  description: string;
  confirmFn: () => Promise<{ error?: string; success?: string }>;
  onSuccess?: () => void;
}

export function ConfirmModal({
  children,
  title,
  description,
  confirmFn,
  onSuccess,
}: ConfirmModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onConfirm = () => {
    startTransition(() => {
      confirmFn().then(({ error, success }) => {
        if (success) {
          toast.success(success);
          onSuccess?.();
          setOpen(false);
          router.refresh();
        } else if (error) {
          toast.error(error);
        }
      });
    });
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger onClick={() => setOpen(true)} asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5 gap-2">
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => setOpen(false)}
            className="w-full sm:w-fit"
          >
            Cancel
          </AlertDialogCancel>
          <Button
            className="w-full sm:w-fit"
            disabled={isPending}
            onClick={onConfirm}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
