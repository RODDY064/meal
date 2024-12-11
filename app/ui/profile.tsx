"use client";
import {  useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { createClient } from '@/utils/supabase/client';
import { useBoundStore } from "@/store/store";
import Link from "next/link";



export default function Profile({ name}:{name?:string}) {
  const { openModal} = useBoundStore();
  const [show, setShow] = useState(false);
  const [supabase] = useState(createClient); 

  const router = useRouter();

  useEffect(()=>{
    document.addEventListener('click', (e:any)=>{
        if(!e.target.closest('.drop-down')){
            setShow(false)
        }
    })
  })

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/auth/login')
  }

  return (
    <div className="relative">
      <div
        onClick={() => setShow(!show)}
        className="size-10 drop-down rounded-full  border cursor-pointer bg-black relative overflow-hidden items-center justify-center flex text-white">
        <p>{name?.charAt(0).toLocaleUpperCase()}</p>
      </div>
      <motion.div
      variants={list}
        animate={show ? "visible" : "hidden"}
        initial="hidden"
        className="drop-down absolute z-30 w-[12rem] pb-4 border border-primary-orange/20 shadow-card backdrop-blur-[12px] mt-2 right-2 rounded-xl p-4 list-none flex flex-col gap-1">
          <motion.li
           onClick={()=>openModal('create',null)}
           variants={item}  className="text-md font-medium hover:text-primary-orange cursor-pointer flex md:hidden">
            Create recipe
          </motion.li>
          <motion.li variants={item}  className="text-md font-medium hover:text-primary-orange cursor-pointer">
           <Link href="/account">Account</Link>
          </motion.li>
          <motion.li variants={item} onClick={handleSignOut}  className="text-md font-medium hover:text-primary-orange cursor-pointer">
            Sign Out
          </motion.li>
      </motion.div>
    </div>
  );
}

const list = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.1,
      delayChildren: 0,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    y: 10,
    transition: { 
        durarion: 0.1,
        when: "afterChildren", 
        staggerChildren: 0.2 
    },
  },
};

const item = {
  visible: { opacity: 1, x: 0,    durarion: 0.1, },
  hidden:  { opacity: 0, x: -10,    durarion: 0.1, },
};
