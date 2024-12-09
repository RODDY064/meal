import { cn } from "@/utils/cn";
import Link from "next/link";
import React from "react";

export default function Button({
  label,
  action,
  link,
  href,
  className
}: {
  label: string;
  action?: () => void;
  link?: boolean;
  href?: string;
  className?: string;
}) {
  return (
    <>
    {link ? (
      <Link href={href as string} className={cn("px-4 py-2 button",className)}>
        {label}
      </Link>
    ):
    <button onClick={action} className={cn("px-4 py-2 button",className)}>
      {label}
    </button>}
    </>
  );
}
