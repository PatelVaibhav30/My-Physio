"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export const useAuthRedirect = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
        redirect("/");
    }
  }, [status]);

  return { status };
};
