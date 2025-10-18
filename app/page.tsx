"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  if (session && session.user) {
    redirect("/dashboard");
  }

  const login = async () => {
    await signIn("google", { prompt: "select_account" });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/banner.svg"
          alt="banner"
          fill
          className="object-cover w-full h-full opacity-30 blur-sm"
          priority
        />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg mx-4 sm:mx-6 md:mx-8 p-6 sm:p-8 lg:p-10 bg-white/70 rounded-xl shadow-lg backdrop-blur-md flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-400 mb-2 text-center">
          MY PHYSIO
        </h1>
        <span className="text-lg sm:text-xl font-extrabold text-gray-600 mb-6 text-center">
          Guiding Recovery with Every Touch
        </span>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2 text-center">
          Login
        </h2>
        <span className="mb-4 text-base sm:text-lg text-gray-500 text-center">
          Get yourself registered
        </span>
        <Button
          onClick={login}
          className="w-full mt-2 bg-white text-gray-600 hover:bg-gray-100 border border-gray-300 flex items-center justify-center py-3 text-sm sm:text-base"
        >
          <Image
            src="/google.svg"
            alt="Google logo"
            width={22}
            height={22}
            className="mr-2"
          />
          Login with Google
        </Button>
      </div>
    </div>
  );
}
