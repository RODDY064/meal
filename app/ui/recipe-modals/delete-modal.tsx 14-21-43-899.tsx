"use client"

import { useBoundStore } from "@/store/store";
import Image from "next/image";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function DeleteModal( { id}:{ id:string}) {

    const { removeRecipe, closeViewModal , isDelected , refeshData }  = useBoundStore()

    const handleDelete = async ()=>{
      await removeRecipe(id)
      closeViewModal()
      refeshData()

    }


    useEffect(()=>{
      if(isDelected){
        toast.success('Recipe successfully deleted')
      }
     
    },[isDelected])


  return (
      <div onClick={handleDelete} className="flex items-center justify-center gap-1 cursor-pointer">
        <Image src="/icons/delete.svg" width={16} height={18} alt="delete" />
        <p className=" text-sm  font-sans  text-red-600">Delete</p>
      </div>
  );
}
