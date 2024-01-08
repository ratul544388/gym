"use client";

import { Fragment, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabsProps {
  items: {
    label: string;
    content: ReactNode;
  }[];
  initialActive: string;
}

export const Tabs = ({ items, initialActive }: TabsProps) => {
  const [active, setActive] = useState(initialActive);
  return (
    <div
      className="flex flex-col gap-3 items-center"
    >
      <div className="flex items-center border rounded-full">
        {items.map((item) => (
          <div
            key={item.label}
            onClick={() => setActive(item.label)}
            className={cn(
              "relative capitalize px-4 py-1.5 cursor-pointer select-none",
              active === item.label && "text-white"
            )}
          >
            {item.label.toLowerCase()}
            {active === item.label && (
              <motion.span
                layoutId="active"
                className="absolute inset-0 -z-10 bg-primary rounded-full"
              />
            )}
          </div>
        ))}
      </div>
      {items.map((item) => (
        <Fragment key={item.label}>
          {active === item.label && item.content}
        </Fragment>
      ))}
    </div>
  );
};
