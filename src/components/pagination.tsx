"use client";

import { useQueryString } from "@/hooks/use-query-string";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  maxPages: number;
}

export const Pagination = ({ maxPages }: PaginationProps) => {
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
  }, [pages, generatePages, currentPage, maxPages]);

  const onPageChange = (page: number) => {
    handleClick({ key: "page", value: page });
  };

  return (
    <div className="mx-auto w-fit mt-8 flex gap-3 bg-background rounded-full shadow-lg border py-2 px-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        className={cn("h-8 w-8 rounded-full text-muted-foreground")}
        disabled={currentPage === 1}
      >
        <ChevronsLeft className="h-5 w-5" />
      </Button>
      {pages.map((page) => (
        <Button
          onClick={() => onPageChange(page)}
          key={page}
          disabled={page > maxPages}
          size="icon"
          variant={page === currentPage ? "primary" : "outline"}
          className={cn(
            "h-8 w-8 rounded-full",
            page === currentPage && "text-white"
          )}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        className={cn("h-8 w-8 rounded-full text-muted-foreground")}
        disabled={currentPage === maxPages}
        size="icon"
      >
        <ChevronsRight className="h-5 w-5" />
      </Button>
    </div>
  );
};
