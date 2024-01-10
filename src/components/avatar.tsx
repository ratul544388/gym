"use client";
import { Avatar as UserAvatar, AvatarImage, AvatarFallback } from "./ui/avatar";
interface AvatarProps {
  image?: string | null;
  alt?: string;
}

export const Avatar = ({ image, alt }: AvatarProps) => {
  const fallback =
    alt && alt.includes(" ")
      ? alt.split(" ").map((word) => word.charAt(0))
      : alt?.charAt(0);

  return (
    <UserAvatar>
      <AvatarImage
        src={image || "/images/placeholder.jpg"}
        alt={alt}
        className="object-cover"
      />
      {alt && <AvatarFallback>{fallback}</AvatarFallback>}
    </UserAvatar>
  );
};
