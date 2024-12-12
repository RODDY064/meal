import Image from "next/image";
import React from "react";

// dynamic recipe page

export default function Recipe({}: {}) {
  return (
    <div className="w-full flex flex-col  items-center mt-24 mb-10 relative z-10">
      <div className="w-full mx-4 md:mx-0 md:w-[600px] text-start ">
        <h1 className="text-3xl font-sans font-bold mx-2">Kemma Soma</h1>
        <div className="mt-10 w-full h-[260px] md:h-[350px] rounded-3xl border border-primary-orange/70 relative overflow-hidden">
          <Image
            src="/images/choco-3.jpg"
            fill
            className="rounded-2xl object-cover"
            alt="choco"
          />
        </div>
        <div className="mt-8">
          <h2 className="text-blue-600 font-sans text-lg font-semibold">Description</h2>
          <p className="font-sans text-[16px] text-gray-600 mt-2">
            In a large bowl, combine the flour, sugar, baking powder, and salt.
            Add the butter and use your fingers to rub it into the flour until
            the mixture resembles coarse crumbs. Add the milk and stir until the
            dough comes together.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-blue-600 font-sans text-lg font-semibold">Tags</h2>
          <p className="font-sans text-[16px] text-gray-600 mt-2">
            #breakfast, #lunch, #dinner
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-blue-600 font-sans text-lg font-semibold">Instructions</h2>
         <div className="ml-4">
         <ul className="list-disc ">
            <li>
              <p className="text-gray-600 text-[16px] font-sans"> In a large bowl, combine the flour, sugar, baking powder, and salt.
            Add the butter and use your fingers to rub it into the flour until
            the mixture resembles coarse crumbs. Add the milk and stir until the
            dough comes together.</p>
            </li>
          </ul>
         </div>
        </div>
      </div>
    </div>
  );
}
