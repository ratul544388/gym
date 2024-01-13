"use client";

import { InstituteName } from "@/lib/constants";
import { Input } from "./ui/input";
import { Mail } from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <div className="flex items-center w-full bg-secondary dark:bg-secondary/50">
      <div className="w-full max-w-screen-sm px-5 py-8 space-y-3 mx-auto">
        <h3 className="font-semibold text-2xl">Get more updates...</h3>
        <p className="text-foreground/80 mt-1">
          Be in the know at {InstituteName}! Sign up for exclusive updates on
          new classes, features, and events. Don&apos;t miss a beat—join our
          newsletter today for the latest in fitness trends and special offers!
        </p>
        <div className="flex items-center gap-3 py-2">
          <div className="relative w-full max-w-[430px]">
            <Mail className="h-4 w-4 text-muted-foreground absolute top-1/2 -translate-y-1/2 left-4 z-20" />
            <Input
              className="w-full pl-12"
              placeholder="Your email address..."
            />
          </div>
          <Button>Subscribe</Button>
        </div>
        <p className="text-foreground/80 text">
          By subscribing, you agree with ConvertKit&pos;s{" "}
          <span className="text-primary/80">Terms of Service</span> and{" "}
          <span className="text-primary/80">Privary Policy</span>.
        </p>
      </div>
    </div>
  );
};
