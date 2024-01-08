import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Sidebar } from "@/components/sidebar/sidebar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper className="min-h-screen">
      <Sidebar />
      <div className="md:pl-[272px]">{children}</div>
    </MaxWidthWrapper>
  );
}
