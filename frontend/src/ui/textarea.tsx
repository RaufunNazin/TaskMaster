import * as React from "react";
import { cn } from "../lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,  // Updated type to HTMLTextAreaElement
  React.TextareaHTMLAttributes<HTMLTextAreaElement> // Updated type here as well
>(({ className, ...props }, ref) => { // Removed 'type' from props since it's not needed for a textarea
  return (
    <textarea // Changed from 'input' to 'textarea'
      className={cn(
        "flex h-52 resize-none overflow-hidden w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea"; // Updated display name

export { Textarea }; // Export the Textarea component
