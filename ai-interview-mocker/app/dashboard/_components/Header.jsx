"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();
  useEffect(()=>{
    console.log(path)
  },[])
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-md">
      <Image src={"/logo.svg"} width={160} height={100} alt="logo" />
      <ul className="hidden md:flex gap-5">
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard'&& 'text-primary font bold' }`}>
          Dashboard
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/Questions'&& 'text-primary font bold' }`}>
          Question
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/Upgrade'&& 'text-primary font bold' }`}>
          Upgarde
        </li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/How'&& 'text-primary font bold' }`}>
          How it works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
