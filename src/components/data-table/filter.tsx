"use client";

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
import { useQueryString } from "@/hooks/use-query-string";
import { Check, PlusCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface FilterProps {
  title: string;
  filterKey: string;
  options: string[];
}

export function Filter({ options, title, filterKey }: FilterProps) {
  const params = useSearchParams();
  const { handleClick } = useQueryString();

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
                    onSelect={() => {
                      handleClick({
                        key: filterKey,
                        value: option.toLowerCase(),
                      });
                    }}
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
                    <span>{option}</span>
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
