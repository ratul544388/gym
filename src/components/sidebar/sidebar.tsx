"use client";

import { useRoutes } from "@/hooks/use-routes";
import { SidebarLinks } from "./sidebar-links";

export const Sidebar = () => {
  const routes = useRoutes();
  return (
    <aside className="fixed inset-y-0 w-[260px] border-r pt-20 pb-2 hidden md:flex flex-col">
      <SidebarLinks />
    </aside>
  );
};
