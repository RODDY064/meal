"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

export default function InputField({
  name,
  type,
  placeholder,
  icon,
  iconSize,
  iconAlt,
  label,
  register,
  errors,
  boxClassName,
}: {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  icon: string;
  iconSize: number;
  iconAlt: string;
  register?: any;
  errors?: any;
  boxClassName?: string;
}) {
  const [showPasword, setShowPassword] = useState(false);

  // handle password visibility

  const handlePasswordVisibility = () => {
    setShowPassword(!showPasword);
  };

  return (
    <div className={cn("w-full  mt-4", boxClassName)}>
      <label className="w-full px-1 font-sans font-medium text-md">
        {label}
      </label>
      <div className={cn("w-full focus-within:border-blue-500/70 w h-12 flex bg-white/40 border-[1.5px]  border-gray-300/40  rounded-[10px]")}>
        <div className="h-full flex gap-2 items-center px-2">
          <Image src={icon} width={iconSize} height={iconSize} alt={iconAlt} />
          <div className="w-[2.5px] h-[60%] bg-white/40 rounded-lg"></div>
        </div>
        <input
          name={name}
          {...register(name, { required: true })}
          type={type === "password" ? (showPasword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full autofill:bg-transparent bg-transparent focus:outline-none py-4 pr-2 h-full font-sans"
        />
        {type === "password" && (
          <div
            onClick={handlePasswordVisibility}
            className="px-2 h-full flex items-center justify-end cursor-pointer"
          >
            {!showPasword ? (
              <Image
                src="/icons/nonvisible.svg"
                width={24}
                height={24}
                alt="eye closed"
              />
            ) : (
              <Image
                src="/icons/visible.svg"
                width={24}
                height={24}
                alt="eye open"
              />
            )}
          </div>
        )}
      </div>
      {errors[name] && <p className="px-1 text-sm text-red-500/70 my-2">
       {errors[name].message}
      </p>}
    </div>
  );
}
