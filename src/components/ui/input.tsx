import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isPending?: boolean;
  autoFocus?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, isPending, autoFocus, type, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (autoFocus) {
        setTimeout(() => {
          inputRef?.current?.focus();
        }, 300);
      }
    }, [autoFocus]);

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isPending && "pointer-events-none opacity-60",
          className
        )}
        ref={inputRef}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
