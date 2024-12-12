"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import ViewModal from "./recipe-modals/view-modal";
import { useBoundStore } from "@/store/store";
import { FetchRecipes } from "@/store/recipe-store";

export default function Card({ recipes }: { recipes: FetchRecipes }) {
  const { openViewModal, closeViewModal, user } = useBoundStore();
  const modalRef = useRef<HTMLDivElement>(null);



  return (
    <div ref={modalRef} className="w-full md:w-auto">
      <div
        onClick={() => openViewModal(recipes)}
        className="flex-1 card break-inside-avoid rounded-3xl border  border-gray-300 md:w-[350px] w-full h-fit relative  bg-white/20 bg-clip-padding p-3 pb-3 backdrop-blur-lg backdrop-filter flex flex-col items-center cursor-pointer"
      >
        <div className="w-full h-full relative">
          <div className="w-full relative md:w-[320px] border h-[12rem] border-gray-300 rounded-2xl overflow-hidden">
            <Image
              src={recipes.image_url ?? ""}
              fill
              alt="choco"
              className="rounded-xl object-cover"
            />
          </div>
          <div className="w-full mt-3 relative px-1">
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <h3 className="font-sans text-gray-900 font-semibold">
                  {recipes.title}
                </h3>
                {recipes.is_public ? (
                  <div className="flex items-center gap-1">
                    <Image
                      src="/icons/unlock.svg"
                      width={16}
                      height={16}
                      alt=""
                    />
                    <p className="text-sm text-gray-400">public</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Image
                      src="/icons/lock.svg"
                      width={16}
                      height={16}
                      alt=""
                    />
                    <p className="text-sm text-gray-400">private</p>
                  </div>
                )}
              </div>
              <p className="font-sans text-gray-500 text-sm truncate">
                {recipes.description}
              </p>
            </div>
            <div className="flex justify-between items-end px-1">
              <div className="flex gap-1 w-1/2 truncate">
                {recipes.tags.map((tag, index) => (
                  <p
                    key={index}
                    className="font-sans text-sm bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent cursor-pointer mt-1 "
                  >
                    #{tag}
                  </p>
                ))}
              </div>
              <p className="text-sm font-sans bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                {recipes.category}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ViewModal />
    </div>
  );
}
