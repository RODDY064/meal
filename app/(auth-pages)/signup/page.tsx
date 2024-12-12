"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import AuthHead from "@/app/ui/auth-head";
import InputField from "@/app/ui/input-field";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { signup } from "../login/action";
import toast from "react-hot-toast";
import { AuthApiError, AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function AuthSignUp() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter()

  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async (data) => {
    try {
      // Convert data to FormData
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
  
      // Call the signup function 
     const results =  await signup(formData)

     if(results?.status === 'success'){
      toast.success(results?.message)
      // push to login upon successfull register
      router.push('/login')
     }
    } catch (err:any) {
        if (err instanceof AuthApiError) {
            toast.error(err.message || 'An error occurred');
        } 
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-24">
      <h1 className="text-3xl font-semibold">Create an Account</h1>
      <p className="text-gray-600 font-medium text-sm">
        Please enter your details to sign up
      </p>
      <AuthHead />
      <div className="mt-4 md:w-[27rem] w-[95%]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="name"
            type="text"
            register={register}
            errors={errors}
            placeholder="Enter your name"
            icon="/icons/user.svg"
            iconSize={20}
            iconAlt="user"
            label="Name"
          />
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
            boxClassName="mt-2"
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
            value="Sign Up"
            className="mt-8 flex items-center justify-center w-full rounded-xl h-12 bg-black text-md font-medium text-white hover:bg-black/70 cursor-pointer "
          />
        </form>
      </div>
    </div>
  );
}
