"use client";

import React, {  useEffect, useState } from "react";
import logo from "../../public/icons/meal.svg";
import Image from "next/image";
import Button from "./button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Profile from "./profile";
import { useBoundStore } from "@/store/store";
import { cn } from "@/utils/cn";

export default  function Nav() {
  const { viewOpen,isOpen, openModal, user ,getUser}  = useBoundStore();
  const [props, setProps] = useState({
    label: "Sign In",
    href: "/login",
  });
  const pathname = usePathname();

  useEffect(() => {
    // Fetch the user on mount
     getUser();

    // Update button properties based on the pathname
    if (pathname === "/auth/login") {
      setProps({ label: "Sign Up", href: "/signup" });
    } else {
      setProps({ label: "Sign In", href: "/login" });
    }
  }, [pathname]);

  const resrictPath = ["/login", "/signup"];

  return (
    <div className={cn("my-4 w-full   flex justify-between ",{
        "z-20": !viewOpen && !isOpen,
    })}>
      <Link href="/" className="flex items-center gap-1">
        <p className="font-medium text-lg md:text-xl">Meal</p>
        <Image src={logo} alt="logo" width={25} height={25} />
      </Link>
      {user ? (
        <div className="flex items-center gap-2">
          <Button label="Create recipe" className="hidden md:flex" action={()=>openModal('create',null)}/>
        <Profile name={user?.user_metadata.name} />
        </div>
      ) : (
        <Button label={props.label} link={true} href={props.href} />
      )}
    </div>
  );
}
function onAuthStateChange(arg0: any) {
  throw new Error("Function not implemented.");
}

