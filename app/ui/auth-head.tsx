"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";

export default function AuthHead() {
  const pathname = usePathname();

  return (
    <div className="w-[95%] md:w-[27rem] h-12 bg-white/30 border border-gray-300/30 backdrop-blur-md p-[4px] flex items-center rounded-lg mt-4">
      <Link
        href="/login"
        className={cn(
          "w-1/2 h-full   backdrop-blur-md  border-gray-300/40 rounded-md flex items-center justify-center text-center cursor-pointer",
          {
            "border bg-white/30": pathname === "/login",
          }
        )}>
        <p className="text-md font-sans font-medium">Sign In</p>
      </Link>
      <Link
        href="/signup"
        className={cn(
          "w-1/2 h-full   backdrop-blur-md  border-gray-300/40 rounded-md flex items-center justify-center text-center cursor-pointer",
          {
            "border bg-white/30": pathname === "/signup",
          }
        )}
      >
        <p className="text-md font-sans font-medium">Sign Up</p>
      </Link>
    </div>
  );
}
