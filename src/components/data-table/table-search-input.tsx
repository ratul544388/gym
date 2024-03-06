"use client";

import { useCurrentQuery } from "@/hooks/use-current-query";
import { useDebounce } from "@/hooks/use-debounce";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const TableSearchInput = ({ value, onChange }: SearchProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const debouncedValue = useDebounce(value, 500);
  const currentQuery = useCurrentQuery();

  useEffect(() => {
    if (debouncedValue) {
      const url = qs.stringifyUrl(
        {
          url: pathname,
          query: {
            ...currentQuery,
            q: value,
          },
        },
        { skipEmptyString: true, skipNull: true }
      );

      router.push(url);
    }
  }, [debouncedValue, pathname, router, currentQuery, value]);

  return (
    <Input
      value={value}
      className="h-8 shadow-md w-fit"
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search members..."
    />
  );
};
