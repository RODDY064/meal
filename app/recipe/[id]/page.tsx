import SingleRecipeCard from "@/app/ui/single-recipe-card";
import Image from "next/image";
import React from "react";

// dynamic recipe page

export default async function Recipe({  params }: { params: Promise<{ id: string }> }) {

  const  recipeID = (await params).id

  return (
    <div className="w-full flex flex-col  items-center mt-24 mb-10 relative z-10">
      <SingleRecipeCard id={recipeID}/>
    </div>
  );
}
