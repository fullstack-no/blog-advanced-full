"use client";

import { signOut } from "next-auth/react";

export const Logout = () => {
  return (
    <button
      className="hover:text-slate-700 dark:hover:text-slate-300"
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
};
