import { currentUser } from "@/lib/current-user";
import { LogoutButton } from "../logout-button";
import { SidebarLinks } from "./sidebar-links";

export const Sidebar = async () => {
  const user = await currentUser();
  return (
    <aside className="fixed inset-y-0 w-[260px] border-r pt-24 hidden md:flex flex-col bg-background">
      <SidebarLinks user={user} />
      {user && <LogoutButton />}
    </aside>
  );
};
