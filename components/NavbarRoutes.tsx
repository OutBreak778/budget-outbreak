"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import NavButton from "./NavButton";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon, Trash } from "lucide-react";
import { DialogTitle } from "./ui/dialog";
import Logo from "./Logo";
import Image from "next/image";
import { Separator } from "./ui/separator";
import Link from "next/link";

export const routes = [
  {
    id: 1,
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    id: 2,
    href: "/transactions",
    label: "Transaction",
  },
  {
    id: 3,
    href: "/accounts",
    label: "Accounts",
  },
  {
    id: 4,
    href: "/categories",
    label: "Categories",
  },
  {
    id: 5,
    href: "/settings",
    label: "Settings",
  },
];

const NavbarRoutes = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isMobile = useMedia("(min-width: 1024px)", false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (!isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <div className="font-normal p-2 rounded-sm bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none transition-all text-white focus:bg-white/30">
            <MenuIcon className="size-5" />
          </div>
        </SheetTrigger>
        <SheetContent side={"left"} className="">
          <DialogTitle className="my-4 w-full flex items-center justify-center" >
            <Link href="/" className="flex">
            {" "}
            <Image
              className="invert mr-2"
              width={46}
              height={46}
              alt="Image"
              src="/logo.svg"
            />
            <span className="text-xl font-bold">OUTBREAK</span>
            </Link>
          </DialogTitle>
          <div className="flex flex-col gap-y-2 pt-6">
            {routes.map((item) => (
              <Button
                key={item.id}
                variant={item.href === pathname ? "outline" : "ghost"}
                onClick={() => onClick(item.href)}
                className="w-full justify-start px-4"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-3 ml-6 overflow-x-auto">
      {routes.map((item) => (
        <NavButton
          key={item.id}
          href={item.href}
          label={item.label}
          isActive={pathname == item.href}
        />
      ))}
    </nav>
  );
};

export default NavbarRoutes;
