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

// view modal component

export default function ViewModal() {
  // Initialize Supabase client
  const [supabase] = useState(createClient);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const { replace } = useRouter();
 const { viewOpen, openViewModal, closeViewModal} = useBoundStore();

  // update the url with recipe id
  useEffect(() => {
    const param = new URLSearchParams(pathname);
    if (viewOpen) {
      replace(`${pathname}?view=${"id"}`);
    } else {
      replace(pathname);
    }
  }, [pathname, viewOpen]);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        // console.error('Error fetching user:', error.message);
      } else {
        setUser(data?.user);
      }
    }

    fetchUser();
  }, [supabase,]);

  // animation
  useGSAP(() => {
    gsap.registerPlugin(useGSAP);
    const tl = gsap.timeline();

    if (viewOpen) {
      tl.to(".view-modal", {
        opacity: 1,
        duration: 0.5,
        zIndex: 10000,
      }).from(
        ".modal",
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.1"
      );
    } else {
      tl.to(".view-modal", {
        opacity: 0,
        duration: 0.5,
        zIndex: -20,
      });
    }
  }, [viewOpen]);

  

  return (
    <div className="view-modal opacity-0 w-full h-full fixed top-0 left-0  z-[-20] bg-white/80 backdrop-blur-2xl  flex flex-col items-center pt-24 lg:py-0 lg:justify-center max-sm:overflow-y-scroll pb-10">
      <div className="modal w-[94%]  md:w-[80%] xl:w-[65%] h-auto max-w-[800px]  md:h-[75%] 2xl:max-h-[600px] break-inside-avoid rounded-3xl md:rounded-[2rem] border  border-gray-300  relative  bg-white/20 bg-clip-padding  px-0  md:px-2 backdrop-blur-lg backdrop-filter flex flex-col items-center shadow-card md:overflow-hidden  ">
        <div className="md:overflow-y-scroll flex flex-col items-center w-full px-4 pt-4 pb-4">
          <div
            id="inner-modal"
            className={cn("w-full flex items-center justify-between")}>
            {/* edit and delete action  */}

            {!user?.id && <p className="opacity-0">hello</p>}
   
            {user?.id && (
              <div className="flex gap-2 md:gap-4">
                <div className="flex items-center justify-center gap-1 cursor-pointer">
                  <Image
                    src="/icons/edit.svg"
                    width={16}
                    height={16}
                    alt="edit"
                  />
                  <p className="text-sm  font-sans  text-blue-600">Edit</p>
                </div>
                <div className="flex items-center justify-center gap-1 cursor-pointer">
                  <Image
                    src="/icons/delete.svg"
                    width={16}
                    height={18}
                    alt="delete"
                  />
                  <p className=" text-sm  font-sans  text-red-600">Delete</p>
                </div>
                <div className="flex items-center justify-center gap-1 cursor-pointer">
                  <Image
                    src="/icons/public.svg"
                    width={16}
                    height={18}
                    alt="delete"
                  />
                  <p className=" text-sm  font-sans  text-teal-500">Publish</p>
                </div>
              </div>
            )}
            <p className="text-sm text-gray-400 hidden md:flex">
              Scroll to read instructions
            </p>
            {/* copy and share action */}
            <div className="flex gap-2 md:gap-4 items-center">
              <div className="flex items-center justify-center gap-1 cursor-pointer">
                <Image
                  src="/icons/share.svg"
                  width={16}
                  height={16}
                  alt="share"
                />
                <p className=" text-sm  font-sans ">Share</p>
              </div>
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
              <Image
                src="/images/choco-3.jpg"
                fill
                alt="share"
                className=" object-cover"
              />
            </div>
            <div className="w-full">
              <h2 className="mt-1 text-xl md:text-2xl font-semibold">
                Keema Soma
              </h2>
              <p className="font-sans text-gray-500 text-sm  mt-1">
                This delicious recipe for Keema Samosa is the perfect handheld
                snack. Filled with a bright spicy and smoky meat filling and
                fried to crispy golden perfection, you will love this tasty and
                savory patti samosa appetize
              </p>
              <p className="mt-3 font-sans bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent  ">
                Tags
              </p>
              <p className="text-sm font-sans text-gray-500 w-full">
                Eggs, Ginger,Rice
              </p>
              <p className="mt-3 font-sans bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                Categories
              </p>
              <p className="text-sm font-sans text-gray-500 w-full">
                Eggs, Ginger,Rice
              </p>
            </div>
          </div>
          <div className="mb-2 mt-5 w-full">
            <h2 className="font-sans text-lg font-medium">Instructions</h2>
            <ul className="mt-4 list-disc pl-6">
              <li className="my-1">
                <p className="font-sans text-gray-500">
                  Preheat the oven to 350°F (180°C). Line a baking sheet with
                  parchment paper.
                </p>
              </li>
              <li className="my-1">
                <p className="font-sans text-gray-500">
                  In a large bowl, combine the flour, sugar, baking powder, and
                  salt. Add the butter and use your fingers to rub it into the
                  flour until the mixture resembles coarse crumbs. Add the milk
                  and stir until the dough comes together.
                </p>
              </li>
              <li className="my-1">
                <p className="font-sans text-gray-500">
                  Turn the dough out onto a floured surface and knead until
                  smooth. Roll out the dough to a 1/2-inch (1 cm) thickness. Cut
                  out 12 rounds using a 2-inch (5 cm) round cutter.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
