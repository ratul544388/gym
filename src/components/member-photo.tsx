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
        "relative w-[200px] aspect-[5/6] rounded-xl overflow-hidden",
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
