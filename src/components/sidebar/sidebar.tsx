import { currentUser } from "@/lib/current-user";
import { ThemeToggler } from "../theme-toggler";
import { SidebarLinks } from "./sidebar-links";
import { isModerator } from "@/lib/utils";

export const Sidebar = async () => {
  const user = await currentUser();

  return (
    <aside className="fixed inset-y-0 w-[260px] border-r pt-20 pb-3 hidden md:flex flex-col">
      <SidebarLinks isModerator={isModerator(user)} />
      <ThemeToggler className="ml-10 mt-auto" />
    </aside>
  );
};
