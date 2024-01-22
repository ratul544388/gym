"use client";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useLoadingStore } from "@/hooks/use-loading-store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
export const BarLoaderProvider = ({ className }: { className?: string }) => {
  const { isOpen, onClose } = useLoadingStore();
  const params = useSearchParams();

  useEffect(() => {
    onClose();
  }, [params, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={cn("fixed top-[75px] inset-x-0 h-1", className)}
    >
      <MaxWidthWrapper className="relative h-full bg-primary/30">
        <motion.div
          initial={{ width: "100px", left: 0, x: -100 }}
          animate={{ width: "50px", left: "100%", x: 0 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="h-full absolute bg-primary"
        />
        <motion.div
          initial={{ width: "100px", left: 0, x: -100 }}
          animate={{ width: "50px", left: "100%", x: 0 }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.75 }}
          className="h-full absolute bg-primary"
        />
      </MaxWidthWrapper>
    </div>
  );
};
