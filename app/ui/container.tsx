"use client";
import React, { useEffect } from "react";
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
    category
  } = useBoundStore();

  useEffect(()=>{
    searching(publicRecipes, search, category)
  },[search, category, publicRecipes])

  // Fetch public recipes on mount

  useEffect(() => {
    getPublicRecipes();
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(useGSAP);

    gsap.to(".container", {
      opacity: 1,
      duration: 1,
      delay: 1.7,
    });
  });

  return (
    <>
      <div className="mt-12  flex flex-col items-center container opacity-0  z-10">
        <Search />
        <div className="mt-6 md:mt-12 flex flex-col md:flex-row  gap-4 w-screen max-w-7xl   px-6 md:px-12 xl:px-24 ">
          <Filter />
          <div className="w-full flex gap-6 flex-col items-center md:flex-row md:items-start">
            {recipeStatus === "loading" || recipeStatus === "idle" ? (
              <div className="w-full md:w-[80%] text-white text-center h-12">
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
    </>
  );
}
