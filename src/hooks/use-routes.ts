import { Home, LayoutDashboard, Settings, ShieldCheck, Users2 } from "lucide-react";
import { usePathname } from "next/navigation";

export const useRoutes = () => {
  const pathname = usePathname();
  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname.includes("dashboard"),
    },
    {
      label: "Members",
      icon: Users2,
      href: "/members",
      active: ["/members", "/members/new", "/members/edit"].includes(pathname),
    },
    {
      label: "Membership Plans",
      icon: ShieldCheck,
      href: "/membership-plans",
      active: ["/membership-plans"].includes(pathname),
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname.includes("settings"),
    },
  ];

  return routes;
};
