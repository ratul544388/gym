import { User } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEndDate = ({
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
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const isModerator = (user: User | null) => {
  return !!(user && (user.role === "ADMIN" || user.role === "MODERATOR"));
};

export const formatMonth = (duration: number) => {
  return duration > 1 ? "Months" : "Month";
};
