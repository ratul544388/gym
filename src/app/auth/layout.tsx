import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center pb-10">
      {children}
    </div>
  );
}
