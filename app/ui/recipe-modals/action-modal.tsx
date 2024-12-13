"use client";

import React, { use, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useBoundStore } from "@/store/store";
import Image from "next/image";
import ImageUpload from "../imageUpload";
import { useForm, SubmitHandler } from "react-hook-form";
import Instrcutions from "./instrcutions";
import z from "zod";
import { loginSchema } from "@/app/(auth-pages)/schema";
import { recipeSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// dynamic create and edit modal

export default function ActionModal() {
  const {
    isOpen,
    closeModal,
    type,
    instructions,
    intruText,
    createRecipe,
    user,
    refeshData,
    viewData,
    addInstruction,
    editRecipe,
    closeViewModal,
    resetInstructions,
  } = useBoundStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<z.infer<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
  });

  // edit the recipe
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const tagsRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (viewData && isOpen && type === 'edit') {
      setValue("title", viewData?.title || "");
      setValue("description", viewData?.description || "");
      setValue("tags", viewData?.tags ? viewData?.tags.join(",") : "");
      setValue("category", viewData?.category);
      setValue("is_public", viewData?.is_public ?? false);
      setValue("image_url", viewData.image_url);
  
      // Reset instructions before adding
      resetInstructions();
  
      // Add instructions only if they don't already exist
      viewData.instructions.forEach((item: string) => {
        // Check if the instruction text is not already in the current instructions
        const isDuplicate = instructions.some(
          (existingInstruction) => existingInstruction.text === item
        );
  
        if (!isDuplicate) {
          addInstruction(null, item);
        }
      });
    } else {
      setValue("title", "");
      setValue("description", "");
      setValue("tags", "");
      setValue("category", "Breakfast");
      setValue("instructions", []);
      setValue("is_public", false);
      setValue("image_url", "");
      resetInstructions();
    }
  
    // Adjust height of description and tags textareas
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
    if (tagsRef.current) {
      tagsRef.current.style.height = "auto";
      tagsRef.current.style.height = `${tagsRef.current.scrollHeight}px`;
    }
  }, [viewData, isOpen, type]);


  // submit function
  const onSubmit: SubmitHandler<z.infer<typeof recipeSchema>> = async (
    data
  ) => {
    try {
      const recipeData = {
        ...data,
        user_id: user?.id ?? null,
        tags: data.tags.split(",").map((tag) => tag.trim()),
      };
      // console.log(recipeData);

      // call the  function base on the type
      if(type === 'create'){
       await createRecipe(recipeData);

      }else{
       await editRecipe({ id: viewData?.id, ...recipeData });
      }

      toast.success(
        type === "create"
          ? "Recipe created successfully!"
          : "Recipe updated successfully!"
      );

      reset();
      closeModal(type);
      closeViewModal();
      refeshData();

    } catch (error) {
      console.log(error);
    }
  };

  // animation
  useGSAP(() => {
    gsap.registerPlugin(useGSAP);
    const tl = gsap.timeline();

    const isMobile = window.innerWidth < 768;
    const animateFromWhere = isMobile ? { y: 20 } : { x: 20 };

    if (isOpen) {
      tl.to(".action-modal", {
        opacity: 1,
        duration: 0.3,
        zIndex: 10000,
        backdropFilter: "blur(12px)",
      }).from(".action-inner-modal", {
        ...animateFromWhere,
        opacity: 0,
        duration: 0.3,
      });
    } else {
      tl.to(".action-modal", {
        opacity: 0,
        duration: 0.3,
        zIndex: -20,
        backdropFilter: "blur(0)",
      });
    }
  }, [isOpen]);

  return (
    <div className="action-modal w-full h-full fixed top-0 left-0 flex flex-col items-center lg:items-end p-4 z-[-20] bg-white/30 pt-12 md:pt-4 overflow-y-scroll  opacity-0">
      <div className="action-inner-modal w-[96%] md:w-[70%]  lg:w-[42%] xl:w-2/6 h-auto md:min-h-full  break-inside-avoid  rounded-2xl md:rounded-3xl relative  bg-white bg-clip-padding border border-primary-orange/70 md:overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full md:overflow-y-scroll md:p-4 p-3 overflow-x-visible">
          <div className="flex justify-between">
            <h1 className="font-sans text-xl font-semibold">
              {type === "create" ? "Create" : "Edit"} a recipe
            </h1>
            <div
              onClick={() => closeModal(type)}
              className="close-modal cursor-pointer size-8 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center ">
              <Image
                src="/icons/close.svg"
                width={16}
                height={16}
                alt="close"
              />
            </div>
          </div>
          <div className="mt-6 md:mt-4 md:pr-3 pl-1">
            <div className="flex flex-col">
              <input
                {...register("title")}
                placeholder="Write recipe title"
                className="w-full h-10 text-lg rounded-lg focus:outline-none
          hover:border-primary-orange/70 border border-white p-2"
              />
              {errors.title && (
                <p className="text-red-500 my-2 font-sans text-sm mx-2">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mt-2">
              <label className="text-sm font-sans font-medium text-black/40 mx-2">
                Desciption
              </label>
              <textarea
                {...register("description")}
                ref={(e) => {
                  register("description").ref(e);
                  descriptionRef.current = e; // Assign to ref
                }}
                placeholder="Write the description of the recipe"
                className="w-full min-h-24 rounded-lg focus:outline-none hover:border-primary-orange/70 border border-white p-2 resize-none"
                onInput={(e: any) => {
                  e.target.style.height = "auto"; // Reset height
                  e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on content
                }}
              />
              {errors.description && (
                <p className="text-red-500 my-2 font-sans text-sm mx-2">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mt-4 relative">
              <label className="text-sm font-sans font-medium text-black/40 mx-2">
                Category
              </label>
              <div className="flex items-center">
                <select
                  {...register("category")}
                  className="w-full h-10 rounded-lg focus:outline-none
             hover:border-primary-orange/70 border border-white p-2 appearance-none cursor-pointer"
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snack</option>
                  <option>Dessert</option>
                  <option>Appetizer</option>
                  <option>Main Course</option>
                  <option>Side Dish</option>
                  <option>Soup</option>
                  <option>Salad</option>
                </select>

                <Image
                  src="/icons/down-arrow.svg"
                  width={25}
                  height={25}
                  alt="down-arrow"
                  className="absolute right-10"
                />
              </div>
              {errors.category && (
                <p className="text-red-500 my-2 font-sans text-sm mx-2">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="flex flex-col mt-2">
              <label className="text-sm font-sans font-medium text-black/40 mx-2">
                Tags
              </label>
              <textarea
                {...register("tags")}
                ref={(e) => {
                  register("tags").ref(e);
                  tagsRef.current = e; // Assign to ref
                }}
                placeholder="Write the tags eg. breakfast, snacks "
                className="w-full min-h-10  rounded-lg focus:outline-none border border-white hover:border-primary-orange/70  p-2 resize-none "
                onInput={(e: any) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              />
              {errors.tags && (
                <p className="text-red-500 my-2 font-sans text-sm mx-2">
                  {errors.tags.message}
                </p>
              )}
            </div>
            <Instrcutions setValue={setValue} />
            {errors.instructions && (
              <p className="text-red-500 my-2 font-sans text-sm mx-2">
                {errors.instructions.message}
              </p>
            )}
          </div>
          <ImageUpload setValue={setValue} errors={errors} />
          <div className="mt-4 mb-10  flex items-center gap-4">
            <label className="text-gray-500 font-sans">Mark it as public</label>
            <input {...register("is_public")} type="checkbox" />
          </div>
          <div className="w-full my-4 mb-8 flex items-center justify-center gap-4">
            <input
              type="submit"
              className="border border-black bg-black py-1.5 px-8 md:px-12 text-white transition-all hover:bg-transparent hover:text-black text-center text-sm font-sans items-center justify-center rounded-lg cursor-pointer"
            />
            <div
              onClick={() => closeModal(type)}
              className="border border-black bg-black py-1.5 px-8 md:px-12 text-white transition-all hover:bg-transparent hover:text-black text-center text-sm font-sans items-center justify-center rounded-lg cursor-pointer"
            >
              Cancel
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
