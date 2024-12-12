"use client";

import { FetchRecipes } from "@/store/recipe-store";
import { useBoundStore } from "@/store/store";
import Image from "next/image";
import React, { useEffect } from "react";
import Loader from "./loader";

export default function SingleRecipeCard({ id }: { id: string }) {
  const { singleRecipe, getSingleRecipe, recipeStatus } = useBoundStore();

  useEffect(() => {
    getSingleRecipe(id);
  }, [id]);


  return (
    <>
      {recipeStatus === "loading" ? (
        <div className="w-ful h-full flex flex-col items-center mt-24">
          <Loader />
        </div>
      ) : recipeStatus === "error" ? (
        <div className="w-ful h-full flex flex-col items-center mt-24">
        <p className="text-sm font-sans text-red-500 text-center">Something went wrong</p>
      </div>
      ) : (
        <div className="w-full mx-4 md:mx-0 md:w-[600px] text-start ">
          <h1 className="text-3xl font-sans font-bold mx-2">{singleRecipe?.title}</h1>
          <div className="mt-10 w-full h-[260px] md:h-[350px] rounded-3xl border border-primary-orange/70 relative overflow-hidden">
            <Image
              src={singleRecipe?.image_url ?? ''}
              fill
              className="rounded-2xl object-cover"
              alt={singleRecipe?.title??'recipe image'}
            />
          </div>
          <div className="mt-8">
            <h2 className="text-blue-600 font-sans text-lg font-semibold">
              Description
            </h2>
            <p className="font-sans text-[16px] text-gray-600 mt-2">
              {singleRecipe?.description}
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-blue-600 font-sans text-lg font-semibold">
              Tags
            </h2>
            <p className="font-sans text-[16px] text-gray-600 mt-2">
              #breakfast, #lunch, #dinner
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-blue-600 font-sans text-lg font-semibold">
              Instructions
            </h2>
            <div className="ml-4">
              <ul className="list-disc ">
                {singleRecipe?.instructions.map((item:string,index:number)=>(
                    <li key={index}>
                    <p className="text-gray-600 text-[16px] font-sans">
                      {item}
                    </p>
                  </li>
                )) }
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
