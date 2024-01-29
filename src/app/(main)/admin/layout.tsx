import { currentUser } from "@/lib/current-user";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();

  if (!user?.isAdmin) {
    return notFound();
  }

  return <>{children}</>;
}
