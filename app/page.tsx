"use client";

import { Highlight } from "@/components/HighLight";
import { routes } from "@/components/NavbarRoutes";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import {
  ArrowRight,
  Divide,
  DivideCircle,
  LayoutDashboard,
  Loader2Icon,
  LucideLayoutDashboard,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { isSignedIn, user } = useUser();
  return (
    <main>
      <header className="flex backdrop-blur-lg items-center justify-between bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-24 pb-6">
        <Link href="/" className="flex items-center justify-between gap-x-2">
          <Image width={40} height={40} alt="Image" src="/logo.svg" />
          <span className="font-semibold text-xl text-[#fff]">OUTBREAK</span>
        </Link>
        <div className={cn(isSignedIn ? "block" : "hidden")}>
          {
            <div className="flex items-center justify-center space-x-4">
              <Link
                href={isSignedIn ? "/dashboard" : "/"}
                className=" bg-[#f3f3f3] rounded-md"
              >
                <Button  variant="outline" size="sm">
                <LayoutDashboard className="size-6 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div>
                {isSignedIn ? (
                  <>
                    <ClerkLoaded>
                      <UserButton />
                    </ClerkLoaded>
                    <ClerkLoading>
                      <Loader2Icon className="size-8 text-white/50 animate-spin" />
                    </ClerkLoading>
                  </>
                ) : (
                  <Loader2Icon className="size-5 animate-spin text-gray-100/50" />
                )}
              </div>
            </div>
          }
        </div>
        <SignedOut>
          <SignInButton>
            <Button variant="outline">Connect here</Button>
          </SignInButton>
        </SignedOut>
      </header>

      <div className="mb-10 mt-24 sm:mt-36 flex flex-col items-center justify-center text-center">
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Maximize Efficiency and Minimize Costs with{" "}
          <Highlight className="underline underline-offset-4 rounded-xl bg-white text-[#2964e4] leading-4">
            OUTBREAK
          </Highlight>
        </h1>
        <p className="mt-7 px-4 max-w-5xl max-x-prose text-slate-700 sm:text-lg">
        OUTBREAK is a comprehensive finance solution that streamlines operations, reduces costs, and automates key workflows. Boost efficiency, make informed decisions, and save time and resources with our cutting-edge technology. Experience optimized performance with OUTBREAK, where innovation drives success.
        </p>
        <Link className="mt-6" href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button variant="default">
            {isSignedIn ? (
              <span>Go to Dashboard</span>
            ) : (
              <span> Learn more</span>
            )}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>

      {/** Image Ring */}

      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2964e4] to-[#9089fc] opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 mb-32 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/10 p-2 ring-3 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src="/dashboard-preview.png"
                    alt="product preview"
                    width={1364}
                    height={866}
                    quality={100}
                    className="rounded-md bg-white p-2 sm:p-8 md:p-4 shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**Feature section */}
      <div className="mx-auto mb-28 mt-28 max-w-5xl sm:mt-52">
        <div className="mb-10 px-5 lg:px-8">
          <div className="mx-auto max-w-5xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-800 sm:text-5xl">
              Start Managing your money
            </h2>
            <p className="mt-4 text-lg max-w-5xl text-gray-600">
              Optimizing your time and finances with us is simpler and more
              efficient than ever before!
            </p>
          </div>
        </div>

        {/*List of Steps */}
        <ol className="my-8 space-y-4 pt-6 md:flex md:space-x-12 pl-4 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-3 pl-3 border-l-4 border-slate-500 md:border-l-0 md:border-t-2  md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 1</span>
              <span className="text-xl font-semibold">
                Sign up for an account
              </span>
              <span className="mt-3 text-slate-700">
                login with us to make sure you are authenticated or safe.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-3 border-l-4 pl-3 border-slate-500 md:border-l-0 md:border-t-2  md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 2</span>
              <span className="text-xl font-semibold">
                Add your Transactions
              </span>
              <span className="mt-3 text-slate-700">
                We&apos;ll proccess your transaction and give you the desired
                output
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-3 border-l-4 pl-3 border-slate-500 md:border-l-0 md:border-t-2  md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 3</span>
              <span className="text-xl font-semibold">Enjoy you OUTBREAK</span>
              <span className="mt-3 text-slate-700">
                It&apos;s simple and easy to add you transactions in real
              </span>
            </div>
          </li>
        </ol>

        <div className="mx-auto max-w-6xl px-6 mb-32 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/10 p-2 ring-3 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/file-upload.png"
                alt="product preview"
                width={1419}
                height={732}
                quality={100}
                className="rounded-md bg-white p-2 sm:p-8 md:p-4 shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-[#2964e4] text-[#BCBCBC] text-sm py-10 text-center">
        <div className="container flex flex-col md:flex-row items-center justify-between md:px-24">
          <Link href="/" className="flex items-center justify-between gap-x-2">
            <Image width={40} height={40} alt="Image" src="/logo.svg" />
            <span className="font-semibold text-xl text-[#fff]">OUTBREAK</span>
          </Link>
          {isSignedIn && (
            <nav
              className={cn(
                "flex flex-row md:flex-row md:justify-center my-5 gap-3 md:gap-7 text-gray-100/90 items-center"
              )}
            >
              {routes.map((item) => (
                <Link
                  href={item.href}
                  key={item.id}
                  className="font-normal text-xs"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
          <p className="mt-6 text-gray-100/90">
            &copy; 2024 OUTBREAK, Inc. All rights reserved
          </p>
        </div>
      </footer>
    </main>
  );
}
