"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface TabTriggerProps {
  href: string;
  children?: React.ReactNode;
}

function TabTrigger({ href, children }: TabTriggerProps) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "px-8 py-1.5 font-semibold transition-all bg-gray-200 text-gray-400 duration-300",
        {
          "bg-white text-slate-600 rounded-md": path === href,
        }
      )}
    >
      {children}
    </Link>
  );
}

interface IPropsTabs {}

export default function Tabs() {
  return (
    <nav className="p-1 bg-gray-100 rounded-lg inline-flex w-max">
      <TabTrigger href="/menu">Menu</TabTrigger>
      <TabTrigger href="/order">Order</TabTrigger>
      <TabTrigger href="/dapur">Dapur</TabTrigger>
      <TabTrigger href="/kasir">Kasir</TabTrigger>
    </nav>
  );
}
