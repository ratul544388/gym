import { currentUser } from "@/lib/current-user";
import { isModerator } from "@/lib/utils";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();

  if (isModerator(user)) {
    return redirect("/admin/dashboard");
  }

  return <>{children}</>;
}
