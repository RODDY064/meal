import React from "react";
import Image from "next/image";

export default function ShareModal() {
  return (
    <>
      <div className="flex items-center justify-center gap-1 cursor-pointer">
        <Image src="/icons/share.svg" width={16} height={16} alt="share" />
        <p className=" text-sm  font-sans ">Share</p>
      </div>
      {/* <div className="w-24 h-32 absolute bg-white shadow-card top-10 ">
        hello
      </div> */}
    </>
  );
}
