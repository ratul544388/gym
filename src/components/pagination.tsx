"use client";

import { useQueryString } from "@/hooks/use-query-string";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight, Router } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { buttonVariants } from "./ui/button";

interface PaginationProps {
  maxPages: number;
}

export const Pagination = ({ maxPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { handleClick } = useQueryString();

  const generatePages = useCallback((resetFrom: number) => {
    return Array.from({ length: 5 }, (_, index) => resetFrom + index);
  }, []);

  const [pages, setPages] = useState<number[]>(generatePages(currentPage));

  useEffect(() => {
    if (currentPage === maxPages || currentPage === 1) return;
    if (currentPage === pages[pages.length - 1]) {
      setPages(generatePages(pages[1]));
    } else if (currentPage === pages[0]) {
      setPages(generatePages(pages[0] - 1));
    }
  }, [pages, generatePages, currentPage, maxPages, searchParams]);

  const onPageChange = (page: number) => {
    handleClick({ key: "page", value: page });
  };

  return (
    <div className="mx-auto w-fit mt-8 flex gap-3 bg-background rounded-full shadow-lg border py-2 px-4">
      <Link
        href={`/${pathname}?page=${currentPage - 1}`}
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "h-8 w-8 rounded-full text-muted-foreground",
          currentPage === 1 && "pointer-events-none opacity-60"
        )}
      >
        <ChevronsLeft className="h-5 w-5" />
      </Link>
      {pages.map((page) => (
        <Link
          href={`${pathname}?page=${page}`}
          onClick={() => onPageChange(page)}
          key={page}
          className={cn(
            buttonVariants({
              size: "icon",
              variant: page === currentPage ? "primary" : "outline",
            }),
            "h-8 w-8 rounded-full",
            page === currentPage && "text-white",
            page > maxPages && "pointer-events-none opacity-60"
          )}
        >
          {page}
        </Link>
      ))}
      <Link
        href={`/${pathname}?page=${currentPage + 1}`}
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "h-8 w-8 rounded-full text-muted-foreground",
          currentPage === maxPages && "pointer-events-none opacity-60"
        )}
      >
        <ChevronsRight className="h-5 w-5" />
      </Link>
    </div>
  );
};
