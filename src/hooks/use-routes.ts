import {
  HelpCircle,
  Home,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users2,
} from "lucide-react";
import { usePathname } from "next/navigation";

export const useRoutes = ({ isModerator }: { isModerator: boolean }) => {
  const pathname = usePathname();

  const adminRoutes = [
    {
      label: "Home",
      icon: Home,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
      active: pathname.includes("dashboard"),
    },
    {
      label: "Members",
      icon: Users2,
      href: "/admin/members",
      active: [
        "/admin/members",
        "/admin/members/new",
        "/admin/members/edit",
      ].includes(pathname),
    },
    {
      label: "Membership Plans",
      icon: ShieldCheck,
      href: "/admin/membership-plans",
      active: ["/admin/membership-plans"].includes(pathname),
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      active: pathname.includes("settings"),
    },
    {
      label: "FAQ",
      icon: HelpCircle,
      href: "/faq",
      active: pathname.includes("faq"),
    },
  ];
  const userRoutes = [
    {
      label: "Home",
      icon: Home,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname.includes("dashboard"),
    },
    {
      label: "Membership Plans",
      icon: ShieldCheck,
      href: "/membership-plans",
      active: pathname.includes("membership-plans"),
    },
    {
      label: "FAQ",
      icon: HelpCircle,
      href: "/faq",
      active: pathname.includes("faq"),
    },
  ];

  return isModerator ? adminRoutes : userRoutes;
};
