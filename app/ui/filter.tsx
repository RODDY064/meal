"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "motion/react";
import { useBoundStore } from "@/store/store";

export default function Filter() {
  const [slide, setSlide] = useState(false);
  const { setCategory, category} = useBoundStore();

  return (
    <>
      {/*  destop filter section */}
      <motion.div
        variants={container}
        animate={slide ? "show" : "hidden"}
        initial="hidden"
        className="gap-2 font-sans hidden md:flex "
      >
        <div className="w-full">
          <div
            onClick={() => setSlide(!slide)}
            className="w-24 h-8 border hover:border-primary-orange/30 rounded-2xl flex items-center justify-center cursor-pointer transition-all "
          >
            {!slide ? (
              <p className=" bg-gradient-to-r  from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
                filter
              </p>
            ) : (
              <div className="flex gap-3 items-center">
                <span className="w-[2px] bg-primary-orange/30 h-4" />
                <Image
                  src="/icons/arrow.svg"
                  width={20}
                  height={20}
                  alt="arrow"
                  className="rotate-[45deg]"
                />
              </div>
            )}
          </div>
          <div>
            <motion.div
              variants={innnerContainer}
              className="mt-4 md:block hidden"
            >
              <h2 className="font-sans text-[15px] text-gray-600/50">filter recipe by</h2>
              <div className="mt-4">
                <div className="flex flex-col">
                  <label className="text-sm">Category</label>
                  <input
                    type="text"
                    value={category as string}
                    placeholder="All"
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-[14rem] h-8 text-sm focus:outline-none p-2 mt-1 bg-white/40  border border-gray-600/30 border-gray-300 rounded-lg"
                  />
                </div>
                {/* <div className="flex flex-col mt-2">
                  <label className="text-sm">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g 30mins"    
                    className="w-[14rem] h-8 text-sm  focus:outline-none p-2 mt-1 bg-white/40  border border-gray-600/30 border-gray-300 rounded-lg"
                  />
                </div> */}
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          animate={slide ? { opacity: 1 } : { opacity: 0 }}
          className="w-[1px]   h-60 bg-primary-orange/50"
        ></motion.div>
      </motion.div>

      {/* mobile filter section */}
      <div className="md:hidden">
        <div
         onClick={() => setSlide(!slide)}
         className="w-24 h-8 border hover:border-primary-orange/30 rounded-2xl flex items-center justify-center cursor-pointer transition-all ">
          <p className=" bg-gradient-to-r  from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
            filter
          </p>
        </div>
        <motion.div
            variants={container2}
            animate={slide ? "show" : "hidden"}
            initial="hidden"
         className="mt-4 w-full">
            <p className="font-sans tex-sm text-nowrapy text-gray-600/50">filter recipe by </p>
            <div className="mt-2 flex items-center gap-4 w-[86vw]">
            <div className="flex flex-col w-full">
                  <label className="text-sm">Category</label>
                  <input
                    type="text"
                    placeholder="All"
                    value={category as string}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-8  focus:outline-none p-2 mt-1 bg-white/40  border border-gray-600/30 border-gray-300 rounded-lg"
                  />
                </div> 
                {/* <div className="flex flex-col w-full">
                  <label className="text-sm">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g 30mins"
                    className="w-full h-8  focus:outline-none p-2 mt-1 bg-white/40  border border-gray-600/30 border-gray-300 rounded-lg"
                  />
                </div> */}
            </div>
        </motion.div>
      </div>
    </>
  );
}

const container = {
  show: {
    width: "20rem",
    transition: {
      duration: 0.3,
    },
  },
  hidden: {
    width: "6rem",
    transition: {
      duration: 0.3,
    },
  },
};

const innnerContainer = {
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};


const container2 = {
    show: {
        opacity: 1,
        height: "5rem",
        transition: {
        duration: 0.3,
        },
    },
    hidden: {
        opacity: 0,
        height: "0",
        transition: {
        duration: 0.3,
        },
    },
}