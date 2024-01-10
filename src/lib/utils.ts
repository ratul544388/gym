import { User } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEndingDate = ({
  startDate,
  durationInMonth,
}: {
  startDate: Date;
  durationInMonth: number;
}) => {
  const date = startDate;
  date.setMonth(date.getMonth() + durationInMonth);
  return date;
};

export const formatText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.toLowerCase().slice(1);
};

export const isModerator = (user: User) => {
  return user && (user.role === "ADMIN" || user.role === "MODERATOR");
};
