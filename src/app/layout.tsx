import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "@/components/header/header";
import { InstituteName } from "@/lib/constants";
import { currentUser } from "@/lib/current-user";
import { cn } from "@/lib/utils";
import { ConfettiProvider } from "@/providers/confetti-provider";
import ModalProvider from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "../providers/theme-provider";
import "./globals.css";
import { BarLoaderProvider } from "@/providers/bar-loader-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: InstituteName,
  description: "Empowering Fitness, Building Strong Lives",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            inter.className,
            "overflow-x-hidden bg-gray-50 dark:bg-gray-900"
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            <ModalProvider />
            <ConfettiProvider />
            <BarLoaderProvider />
            <main className="pb-10 min-h-screen flex flex-col gap-3">
              <Header user={user} />
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
