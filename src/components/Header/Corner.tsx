"use client";

import Link from "next/link";
import { Logout } from "./Logout";
import { useSession } from "next-auth/react";

export const Corner = () => {
  const { status } = useSession();

  return status !== "authenticated" ? (
    <Link
      href="/login"
      className=" hover:text-slate-700 dark:hover:text-slate-300"
    >
      Login
    </Link>
  ) : (
    <>
      <Link
        href="/write"
        className=" hover:text-slate-700 dark:hover:text-slate-300"
      >
        Write
      </Link>
      <Logout />
    </>
  );
};
