import { currentUser } from "@/lib/current-user";
import { isModerator } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();

  if (!isModerator(user)) {
    return notFound();
  }

  return <>{children}</>;
}
