import Logo from "@/components/Logo";
import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-1 p-3 my-4">
          <h1 className="text-4xl font-semibold text-[#3E3A47]">
            Welcome to Trackify
          </h1>
          <p className="text-muted-foreground text-sm">
          New here? Create an account and unlock your dashboard
          </p>
        </div>
        <div className="flex items-center justify-center mt-4">
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground w-7 h-7" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <div className="border-2 border-gray-500/20 bg-white rounded-xl px-12 py-20 flex items-center justify-center flex-col">
          <Image width={140} height={140} alt="Image" src="/logo.svg" className="invert" />
          <span className="font-semibold text-5xl text-[#394149]">
            OUTBREAK
          </span>
        </div>
      </div>
    </div>
  );
}
