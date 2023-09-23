import React from "react";
import { cn } from "@/lib/utils";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leading?: React.ReactNode;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ className, leading, ...props }, ref) {
    return (
      <div className="focus-within:outline-none focus-within:outline-2 focus-within:outline-gray-300 focus-within:outline-offset-1 px-4 py-2 bg-white rounded-md flex gap-2">
        {leading}
        <input
          ref={ref}
          className={cn("outline-none flex-1", className)}
          {...props}
        />
      </div>
    );
  }
);

export default TextField;
