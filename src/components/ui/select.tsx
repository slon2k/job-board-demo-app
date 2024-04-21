import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

export interface SelectProps extends React.HTMLProps<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "h-10 w-full appearance-none truncate rounded-md border border-input bg-background py-2 pl-3 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        <ChevronDown className="absolute right-3 top-3 size-4 opacity-50" />
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
