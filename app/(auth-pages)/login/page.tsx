"use client";

import React from "react";
import AuthHead from "@/app/ui/auth-head";
import InputField from "@/app/ui/input-field";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { login } from "./action";
import toast from "react-hot-toast";
import { AuthApiError, AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function AuthLogin() {
  
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter()

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {
    try {
      // Convert data to FormData
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
  
     const results =  await login(formData);

     if(results?.status === 'success'){
      toast.success(results?.message)
      // push to home upon successfull register
      router.push('/')
     }
  
      
    } catch (err) {
      console.log(err)
      if (err instanceof AuthApiError) {
        toast.error(err.message || 'An error occurred');
      } 
    }
  };
  

  return (
    <div className="w-full flex flex-col items-center mt-24">
      <h1 className="text-3xl font-semibold">Welcome Back</h1>
      <p className="text-gray-600 font-medium text-sm">
        Please enter details to sign in
      </p>
      <AuthHead />
      <div className="mt-4 md:w-[27rem] w-[95%]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="email"
            type="email"
            register={register}
            errors={errors}
            placeholder="Enter your email"
            icon="/icons/email.svg"
            iconSize={20}
            iconAlt="email"
            label="Email"
          />
          <InputField
            name="password"
            type="password"
            register={register}
            errors={errors}
            placeholder="Enter your password"
            icon="/icons/password.svg"
            iconSize={20}
            iconAlt="password"
            boxClassName="mt-2"
            label="Password"
          />
          <input
            type="submit"
            value="Sign In"
            className="mt-8 flex items-center justify-center w-full rounded-xl h-12 bg-black text-md font-medium text-white hover:bg-black/70 cursor-pointer "
          />
         
        </form>
      </div>
    </div>
  );
}
