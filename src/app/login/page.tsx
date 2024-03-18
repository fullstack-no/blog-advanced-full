"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();

  const { status } = useSession();

  if (status === "loading") {
    return <div>loading...</div>;
  }

  if (status === "authenticated") {
    return router.push("/");
  }

  return (
    <div className="w-full max-w-md p-16 mt-[5vh] mx-auto flex flex-col items-center justify-center gap-8 bg-slate-200 dark:bg-slate-700 rounded-md text-white">
      <button
        className="px-8 py-4 w-full rounded-md bg-red-500 font-bold text-xl flex items-center gap-4"
        onClick={() => signIn("google")}
      >
        <Image
          src="/google.png"
          alt=""
          width={30}
          height={30}
          className=" rounded-full"
        />
        <div>Login with Google</div>
      </button>
      <button className="px-8 py-4 w-full rounded-md bg-sky-500 font-bold text-xl flex items-center gap-4">
        <Image
          src="/facebook.png"
          alt=""
          width={30}
          height={30}
          className=" rounded-full"
        />
        <div>Login with Facebbok</div>
      </button>
      <button className="px-8 py-4 w-full rounded-md bg-black font-bold text-xl flex items-center gap-4">
        <Image
          src="/github.png"
          alt=""
          width={30}
          height={30}
          className=" rounded-full"
        />
        <div>Login with Github</div>
      </button>
    </div>
  );
};

export default LoginPage;
