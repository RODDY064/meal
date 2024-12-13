"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useBoundStore } from "@/store/store";
import Loader from "../loader";

export default function ShareModal({
  isPublic,
  id,
  publicLink,
}: {
  id: string;
  isPublic: boolean;
  publicLink: string;
}) {
  const { setPublicLink } = useBoundStore();
  const [copied, setCopied] = useState<"idle" | "copying" | "copied">("idle");
  const [link, setLink] = useState("");

  //copy to clipboard
  const copyToClipboard = async (linkString: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied("copied");
      setTimeout(() => {
        setCopied("idle");
      }, 2000);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  const handleClick = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; 
    const link = `${baseUrl}/recipe/${id}`;

    setCopied("copying");

    if (isPublic && !publicLink && publicLink !== link) {
      setPublicLink(id, link);
      setLink(link);
      copyToClipboard(link);
    }else{
      setLink(link);
      copyToClipboard(link);
    }
  };

  return (
    <>
      {copied === "idle" ? (
        <div onClick={handleClick} className="flex items-center justify-center gap-1 cursor-pointer ">
        <Image src="/icons/share.svg" width={16} height={16} alt="share" />
        <p className=" text-sm  font-sans ">Share</p>
      </div>
      ) : copied === "copying" ? (
        <div className="w-min-32  flex items-center gap-1">
          <Loader/>
          <p className="font-sans text-sm text-nowrap">generating link</p>
        </div>
      ) : (
        <div className="px-2 flex items-center gap-2">
          <Image src="/icons/check.svg" width={16} height={16} alt="check" />
          <p className="font-sans text-sm">link copied</p>
        </div>
      )}
    </>
  );
}
