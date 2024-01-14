"use client";

import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center md:pl-[240px]">
      <Loader2 className="text-primary animate-spin h-10 w-10" />
    </div>
  );
};
