import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const value = props.value as string;

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      }
    }, [value]);

    // React.useEffect(() => {
    //   if (autoFocus) {
    //     setTimeout(() => {
    //       const inputElement = inputRef?.current;

    //       if (inputElement) {
    //         inputElement.focus();
    //         const textLength = inputElement.value.length;
    //         inputElement.setSelectionRange(textLength, textLength);
    //       }
    //     }, 300);
    //   }
    // }, [autoFocus]);

    return (
      <textarea
        className={cn(
          "flex w-full resize-none overflow-y-hidden rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={inputRef}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
