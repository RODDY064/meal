"use client";
import React, { useEffect, useRef } from "react";
import Search from "./search";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Filter from "./filter";
import Card from "./card";
import { useBoundStore } from "@/store/store";
import Loader from "./loader";
import { FetchRecipes } from "@/store/recipe-store";

export default function Container() {
  const {
    getPublicRecipes,
    publicRecipes,
    recipeStatus,
    searchData,
    search,
    searching,
    category,
    dataUpdated
  } = useBoundStore();

  useEffect(()=>{
    searching(publicRecipes, search, category)
  },[search, category, publicRecipes])
  const ref = useRef(null)

  // Fetch public recipes on mount and when its changes  
  useEffect(() => {
   getPublicRecipes();
  }, [dataUpdated]);

  useEffect(()=>{
    console.log(publicRecipes)
  },[publicRecipes])

  useGSAP(() => {
    gsap.registerPlugin(useGSAP);

    gsap.to(".container", {
      opacity: 1,
      duration: 1,
      delay: 1.8,
    });
  },{ scope: ref});

  return (
    <div ref={ref} className="relative">
      <div className="mt-12 mb-10 flex flex-col items-center container opacity-0  ">
        <Search />
        <div className="mt-6 md:mt-12 flex flex-col md:flex-row  gap-4 w-screen max-w-7xl   px-6 md:px-12 xl:px-4 ">
          <Filter />
          <div className="w-full gap-6 md:mt-0 mt-6 flex flex-col items-center md:flex-row relative flex-wrap overflow-hidden ">
            {recipeStatus === "loading" || recipeStatus === "idle" ? (
              <div className="w-full md:w-[85%]  flex flex-col items-center h-12  text-white text-center ">
                <Loader />
              </div>
            ) : recipeStatus === "error" ? (
              <p className="w-full md:w-[80%] text-red-600 text-center h-12">
                Something went wrong
              </p>
            ) : (
              <>
                {search.length > 0 || category?.length > 0 ? (<>
                  {searchData?.map((recipe: FetchRecipes) => (
                    <Card key={recipe.id} recipes={recipe} />
                  ))}
                </>) :(<>
                  {publicRecipes.map((recipe: FetchRecipes) => (
                    <Card key={recipe.id} recipes={recipe} />
                  ))}
                </>)}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
