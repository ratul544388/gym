"use client";

import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function Page() {
  const { theme } = useTheme();
  const baseTheme = theme === "dark" ? dark : undefined;
  return (
    <SignUp
      appearance={{
        baseTheme,
      }}
    />
  );
}
