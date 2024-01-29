import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();

  if (user?.isAdmin) {
    return redirect("/admin/dashboard");
  }

  return <>{children}</>;
}
