"use client";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

export default function HeroText() {
  // animations

  useGSAP(() => {
    const hero = new SplitType(".intro");

    gsap.registerPlugin(useGSAP);

    const tl = gsap.timeline();

    tl.to('.intro',{
        opacity:1,
    }).to(".intro .char", {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.05,
      ease: "back.out(1.7)",
    }).to(".sub-intro", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
    },"-=0.5").to('.desc',{
        opacity: 1,
        duration: 0.5,
        ease:"power1.inOut"
    },"-=0.2")


  });

  return (
    <div>
      <h1 className=" font-sans text-center mt-5 text-5xl font-extrabold  sm:text-6xl flex flex-col">
        <span className="intro opacity-0"> Cook & Share</span>
        <span className="sub-intro bg-gradient-to-r  from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
          Your Recipe Haven
        </span>
      </h1>
      <p className="desc text-gray-600 mt-5  mx-6  md:mx-4 text-lg sm:text-xl max-w-2xl text-center opacity-0">
        Meal is your go-to platform for discovering, creating, and sharing
        delicious recipes. Whether you’re a seasoned chef or a kitchen newbie,
        explore a world of culinary inspiration in one simple, user-friendly
        hub.
      </p>
    </div>
  );
}
