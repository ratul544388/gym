"use client";

import { useCurrentQuery } from "@/hooks/use-current-query";
import { Gender } from "@prisma/client";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { IoFemale, IoMale } from "react-icons/io5";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const StatusCellHeader = () => {
  const currentQuery = useCurrentQuery();
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const orderby = params.get("orderby");

  const handleClick = (orderby: string) => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        ...currentQuery,
        orderby,
      },
    });

    router.push(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none">
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center gap-2"
        >
          Status
          {orderby === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : orderby === "desc" ? (
            <ArrowDown className="h-4 w-4" />
          ) : (
            <ChevronsUpDown className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[80px]">
        <DropdownMenuItem onClick={() => handleClick("asc")}>
          <ArrowUp className="h-4 w-4" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleClick("desc")}>
          <ArrowDown className="h-4 w-4" />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
