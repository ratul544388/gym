"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function Page() {
  const { theme } = useTheme();
  const baseTheme = theme === "dark" ? dark : undefined;
  return (
    <SignIn
      appearance={{
        baseTheme,
      }}
    />
  );
}
