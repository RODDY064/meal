"use client";

import Card from "@/app/ui/card";
import { useBoundStore } from "@/store/store";
import React, { use, useEffect } from "react";
import Loader from "../ui/loader";
import { FetchRecipes } from "@/store/recipe-store";

// account page

export default function Account() {
  const { userRecipes, getUserRecipes, dataUpdated, user, recipeStatus, } =
    useBoundStore();

  

  useEffect(() => {
    getUserRecipes(user?.id as string);
  },[dataUpdated]);

  return (
    <div className="mt-12 md:mt-24 flex flex-col items-center md:w-auto w-full">
      <h1 className="text-4xl font-bold font-sans">My Account</h1>
      <div className="w-full mt-24 px-4   flex  flex-col ">
        {recipeStatus === "loading" ? (
          <div className="w-full">
            <Loader />
          </div>
        ) : recipeStatus === "error" ? (
          <div className="w-full flex items-center justify-self-center">
            <p className="tex-sm font-sans text-red-500">
              Something went wrong{" "}
            </p>
          </div>
        ) : (
          <div className="w-full flex gap-6 flex-wrap flex-col items-center md:flex-row ">
            {userRecipes.map((recipes: FetchRecipes) => (
              <Card recipes={recipes} key={recipes.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
