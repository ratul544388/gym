"use client";
import * as React from "react";

import { cn, formatText } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Check, PlusCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useLoadingStore } from "@/hooks/use-loading-store";

interface FilterProps {
  title: string;
  filterKey: string;
  options: string[];
}

export function Filter({ options, title, filterKey }: FilterProps) {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const { onOpen } = useLoadingStore();

  const onSelect = (value: string) => {
    onOpen();
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      [filterKey]: value,
    };

    if (params?.get(filterKey) === value) {
      delete updatedQuery[filterKey];
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="w-fit shadow-md">
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed whitespace-nowrap"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {params.get(filterKey) && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {formatText(params.get(filterKey) as string)}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = params.get(filterKey) === option;
                return (
                  <CommandItem
                    key={option}
                    onSelect={() => onSelect(option.toLowerCase())}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    {/* {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )} */}
                    <span>{option}</span>
                    {/* <Badge
                      className="ml-auto h-5 w-5 p-0 flex items-center justify-center rounded-full"
                      variant="outline"
                    >
                      {option.count}
                    </Badge> */}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
