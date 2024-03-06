"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Input } from "../ui/input";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const TableSearchInput = ({ value, onChange }: SearchProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if(debouncedValue) {
      router.push(`${pathname}?q=${debouncedValue}`)
    }
  }, [debouncedValue, pathname, router]);

  return (
    <Input
      value={value}
      className="h-8 shadow-md w-fit"
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search members..."
    />
  );
};
