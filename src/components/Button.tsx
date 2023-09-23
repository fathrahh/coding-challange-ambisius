import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonStyle = cva(
  "inline-flex justify-center items-center border-[1px] rounded-md font-semibold cursor-pointer disabled:cursor-default",
  {
    variants: {
      variant: {
        neutral: "bg-neutral-700 disabled:bg-neutral-500 text-white",
        danger: "bg-red-500 disabled:bg-red-300 text-white",
        light: "bg-white text-slate-600 hover:bg-gray-50",
      },
      size: {
        sm: "px-4 py-1 text-sm",
        md: "px-6 py-2 text-base",
        lg: "px-8 py-3 text-base",
        fill: "px-8 py-3 w-full text-base",
        icon: "w-10 h-10 rounded-full grid place-content-center",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  }
);

interface ButtonProps
  extends VariantProps<typeof buttonStyle>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  variant,
  size,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(buttonStyle({ size, variant }), className)}
      {...rest}
    />
  );
}
