"use client";

import { cn } from "@/utils/cn";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname, useRouter } from "next/navigation";
import { useBoundStore } from "@/store/store";
import DeleteModal from "./delete-modal";
import ShareModal from "./share-modal";

// view modal component

export default function ViewModal() {
  // Initialize Supabase client
  const [supabase] = useState(createClient);
  const { viewOpen, closeViewModal, viewData, user, openModal, setPublic } =
    useBoundStore();

  // animation
  useGSAP(() => {
    gsap.registerPlugin(useGSAP);
    const tl = gsap.timeline({ });

    if (viewOpen) {
     tl.to(
      ".view-modal",
      {
        opacity: 1,
        zIndex: 1000,
        backdropFilter: "blur(15px)",
      },
      "-=0.2"
    ).to(".modal", {
      opacity: 1,
    });

    } else {
    
        gsap.to(".modal", {
          opacity: 0,
          onComplete: () => {
            gsap.set(".view-modal", { opacity: 0, zIndex: -1 , });
          },
        });
      
    }
  }, [viewOpen]);

  return (
    <>
 
        <div className="view-modal  w-full h-full fixed top-0 left-0 opacity-0  bg-white/40   flex flex-col items-center pt-24 lg:py-0 lg:justify-center max-sm:overflow-y-scroll pb-10">
          <div className="w-[94%] modal   md:w-[80%] xl:w-[65%] h-auto max-w-[800px]  md:h-[75%] 2xl:max-h-[600px] break-inside-avoid rounded-3xl md:rounded-[2rem] border  border-primary-orange/70  relative  bg-white bg-clip-padding  px-0  md:px-2 flex flex-col items-center md:overflow-hidden  ">
            <div className="md:overflow-y-scroll flex flex-col items-center w-full px-4 pt-4 pb-4">
              <div
                id="inner-modal"
                className={cn("w-full flex items-center justify-between")}
              >
                {/* edit and delete action  */}

                {!user?.id && <p className="opacity-0">hello</p>}

                {user?.id && (
                  <div className="flex gap-2 md:gap-4">
                    {/* hide edit for the user thats the recipes does no tbelogn to */}
                    {viewData?.user_id === user.id && (
                      <>
                        <div
                          onClick={() => openModal("edit", viewData)}
                          className="flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Image
                            src="/icons/edit.svg"
                            width={16}
                            height={16}
                            alt="edit"
                          />
                          <p className="text-sm  font-sans  text-blue-600">
                            Edit
                          </p>
                        </div>
                        <DeleteModal id={viewData?.id as string} />
                        {!viewData?.is_public && (
                          <div
                            onClick={() => setPublic(viewData?.id as string)}
                            className="flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Image
                              src="/icons/public.svg"
                              width={16}
                              height={18}
                              alt="delete"
                            />
                            <p className=" text-sm  font-sans  text-teal-500">
                              Publish
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
                <p className="text-sm text-gray-400 hidden md:flex">
                  Scroll to read instructions
                </p>
                {/* copy and share action */}
                <div className="flex gap-2 md:gap-4 items-center">
                  <ShareModal/>
                  <div
                    onClick={closeViewModal}
                    className="close-modal cursor-pointer size-8 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center "
                  >
                    <Image
                      src="/icons/close.svg"
                      width={16}
                      height={16}
                      alt="close"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full max-sm:flex-col flex flex-start mt-4 md:px-2 gap-6">
                <div className="w-full md:w-1/2 h-[16rem] rounded-3xl border flex-none relative overflow-hidden">
                  {viewOpen && 
                   <Image
                    src={viewData?.image_url ?? ""}
                    fill
                    alt="share"
                    className=" object-cover"
                  />}
                </div>
                <div className="w-full">
                  <h2 className="mt-1 text-xl md:text-2xl font-semibold">
                    {viewData?.title}
                  </h2>
                  <p className="font-sans text-gray-500 text-sm  mt-1">
                    {viewData?.description}
                  </p>
                  <p className="mt-3 font-sans bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent  ">
                    Tags
                  </p>
                  <div className="flex gap-2 items-center">
                    {viewData?.tags.map((tag: string, index: number) => (
                      <p
                        key={index}
                        className="text-sm font-sans text-gray-500 "
                      >
                        {tag}
                      </p>
                    ))}
                  </div>
                  <p className="mt-3 font-sans bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                    Categories
                  </p>
                  <p className="text-sm font-sans text-gray-500 w-full">
                    {viewData?.category}
                  </p>
                </div>
              </div>
              <div className="mb-2 mt-5 w-full">
                <h2 className="font-sans text-lg font-medium">Instructions</h2>
                <ul className="mt-4 list-disc pl-6">
                  {viewData?.instructions.map(
                    (instruction: string, index: number) => (
                      <li className="my-1" key={index}>
                        <p className="font-sans text-gray-500">{instruction}</p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
