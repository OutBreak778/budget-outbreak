"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

const WelcomeMessage = () => {
  const { user, isLoaded } = useUser();
  return (
    <div className="space-y-3 mb-3">
      <h2 className="text-white text-xl">
        Welcome to your Dashboard{isLoaded ? ", " : " "}{" "}
        <span className="text-2xl underline underline-offset-4">
          {user?.firstName} {user?.lastName}
        </span>
      </h2>
      <p className="text-sm lg:text-base text-[#a9c6f8]">Here is your comprehensive financial summary.</p>
    </div>
  );
};

export default WelcomeMessage;
