"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface MemberPhotoProps {
  image: string | null;
  className?: string;
}

export const MemberPhoto = ({ image, className }: MemberPhotoProps) => {
  return (
    <div
      className={cn(
        "relative w-full max-w-[280px] aspect-[4/3] overflow-hidden border rounded-lg",
        className
      )}
    >
      <Image
        src={image || "/images/placeholder.jpg"}
        alt="member-photo"
        fill
        className="object-cover"
      />
    </div>
  );
};
