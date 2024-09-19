"use client";

import React from "react";
import Logo from "./Logo";
import NavbarRoutes from "./NavbarRoutes";
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import WelcomeMessage from "./WelcomeMessage";
import { useMedia } from "react-use";
import Filters from "./Filters";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const isMobile = useMedia("max-width: 1024px", false);
  const {user} = useUser()
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-16 pb-32">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-16">
          <div className="flex items-center lg:gap-x-6">
            {!isMobile && <Logo />}
            <NavbarRoutes />
          </div>
          <div className="block lg:hidden">
            {(
              <Link
                href="/"
                className="flex items-center justify-between gap-x-2"
              >
                <div className="items-center flex space-x-2">
                  <Image width={40} height={40} alt="Image" src="/logo.svg" />
                  <span className="font-semibold text-xl text-[#fff]">
                    OUTBREAK
                  </span>
                </div>
              </Link>
            )}
          </div>
          <div>
            <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2Icon className="size-8 text-white/50 animate-spin" />
          </ClerkLoading>
          </div>
        </div>
        <WelcomeMessage />
        <Filters />
      </div>
    </header>
  );
};

export default Header;
