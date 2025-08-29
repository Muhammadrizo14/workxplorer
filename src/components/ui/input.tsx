import * as React from "react";
import { cn } from "@/src/_lib/utils";



export type InputProps = {
  variant?: "green" | "blue";
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", variant = "green", ...props }, ref) => {
    const variantClasses = {
      green: "bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500",
      blue: "bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563eb]",
    }[variant];

    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          // base shadcn styles (without bg/border so variant controls it)
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          variantClasses,
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
