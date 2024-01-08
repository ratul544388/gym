"use client";

import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const CardWrapper = ({
  children,
  title,
  description,
}: CardWrapperProps) => {
  return (
    <Card className="max-w-[600px] mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
