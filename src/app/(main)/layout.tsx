import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Sidebar } from "@/components/sidebar/sidebar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper className="h-full md:pl-0 pb-10">
      <Sidebar />
      <div className="md:pl-[276px] h-full">{children}</div>
    </MaxWidthWrapper>
  );
}
