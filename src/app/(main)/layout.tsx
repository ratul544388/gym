import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Sidebar } from "@/components/sidebar/sidebar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper className="md:pl-0 pb-10 flex-1 flex-grow">
      <Sidebar />
      <div className="md:pl-[276px] h-full">{children}</div>
    </MaxWidthWrapper>
  );
}
