"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function Home() {

  const { data: session, status } = useSession();

  if (session && session.user) {
    redirect("/dashboard");
  }

  const login = async () => {
    await signIn("google", { prompt: "select_account" });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">

      <div className="mb-16">
        <h1 className="text-4xl font-extrabold text-green-400">MY PHYSIO</h1>
        <span className="text-xl font-extrabold text-gray-600">Guiding Recovery with Every Touch</span>
      </div>

      <div className="flex items-stretch justify-center w-full max-w-4xl h-[500px] shadow-lg rounded-lg overflow-hidden">
        
        {/* Login Section */}
        <div className="backdrop-blur-md flex flex-col justify-start w-full md:w-1/2 p-8 h-full">
          <h1 className="text-3xl font-semibold text-gray-600">Login</h1>
          <span className="mt-2 text-lg text-gray-500">Get yourself registered</span>
          <Button onClick={login} className='w-full mt-5 bg-white text-gray-600 hover:bg-gray-100 border border-gray-300 flex items-center justify-center'>
            <Image src="/google.svg" alt="logo" width={20} height={20} className="mr-2" />
            Login with Google
          </Button>
        </div>

        {/* Image Section - Hidden on smaller screens */}
        <div className="hidden md:flex bg-[#E0E1DC] flex-col justify-center items-center w-1/2 h-full">
          <Image src="/banner.svg" alt="banner" width={350} height={350} className="object-cover" />
        </div>
      </div>

    </div>
  );
}
