import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classNames: ClassValue[]): string {
  return twMerge(clsx(classNames));
}

export function generateNewId(): number {
  return Math.floor(100000 * Math.random());
}
