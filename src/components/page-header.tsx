"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";

interface PageHeaderProps {
  label: string;
  actionLabel?: string;
  actionUrl?: string;
  backButtonUrl?: string;
  hideBackButton?: boolean;
}

export const PageHeader = ({
  label,
  actionLabel,
  actionUrl,
  backButtonUrl,
  hideBackButton,
}: PageHeaderProps) => {
  const router = useRouter();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              backButtonUrl ? router.push(backButtonUrl) : router.back()
            }
            className={cn(hideBackButton && "hidden")}
          >
            <ArrowLeft className={cn("h-5 w-5")} />
          </Button>
          <h3 className="text-2xl font-bold">{label}</h3>
        </div>
        {actionLabel && actionUrl && (
          <Link href={actionUrl} className={cn(buttonVariants(), "group")}>
            Add new
            <Plus className="ml-2 h-4 w-4 group-hover:scale-[1.5] transition" />
          </Link>
        )}
      </div>
      <Separator />
    </div>
  );
};
