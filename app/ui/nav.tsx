"use client";

import React, { Profiler, use, useEffect, useState } from "react";
import logo from "../../public/icons/meal.svg";
import Image from "next/image";
import Button from "./button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Profile from "./profile";
import { createClient } from '@/utils/supabase/client';
import { User } from "@supabase/supabase-js";


export default  function Nav() {

  const [supabase] = useState(createClient); // Initialize Supabase client
  const [user, setUser] = useState<User | null>(null);
  const [props, setProps] = useState({
    label: "Sign In",
    href: "/login",
  });
  const pathname = usePathname();

  useEffect(() => {
    async function fetchUser() {
      const { data, error, } = await supabase.auth.getUser();
      if (error) {
        // console.error('Error fetching user:', error.message);
      } else {
        setUser(data?.user);
      }
    }

    fetchUser();

    // Update button properties based on the pathname
    if (pathname === "/auth/login") {
      setProps({ label: "Sign Up", href: "/signup" });
    } else {
      setProps({ label: "Sign In", href: "/login" });
    }
  }, [pathname, supabase]);

  return (
    <div className="my-4 w-[100%] backdrop-blur-[4px] bg-white/30 relative z-30 flex justify-between 2xl:max-w-2xl 2xl:mx-auto">
      <Link href="/" className="flex items-center gap-1">
        <p className="font-medium text-lg md:text-xl">Meal</p>
        <Image src={logo} alt="logo" width={25} height={25} />
      </Link>
      {user ? (
        <div className="flex items-center gap-2">
          <Button label="Create recipe" className="hidden md:flex"/>
        <Profile name={user?.user_metadata.name} />
        </div>
      ) : (
        <Button label={props.label} link={true} href={props.href} />
      )}
    </div>
  );
}
