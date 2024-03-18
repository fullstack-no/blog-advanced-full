"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const TopInfo = () => {
  const [post, setPost] = useState<any>(null as any);

  useEffect(() => {
    const getdata = async () => {
      try {
        const resp = await fetch(process.env.SERVER_URL + "/api/posts");
        const data = await resp.json();

        setPost(data.posts?.[0]);

        console.log(data);
      } catch (error) {
        console.log("failed load top! ", error);
      }
    };
    getdata();
  }, []);

  return post ? (
    <div className="space-y-10">
      <h1 className="text-2xl xl:text-4xl leading-10 font-bold">
        {post.title}
      </h1>

      <div className="flex flex-col xl:flex-row items-center gap-x-10 gap-y-14">
        <div className="mx-auto xl:basis-1/2 xl:grow-0 xl:order-2">
          <Image
            src={post.image || "/fall.jpg"}
            alt=""
            width={700}
            height={700}
            className="w-full max-w-[700px] max-h-[500px] object-contain "
          />
        </div>
        <div className="xl:basis-1/2 xl:grow-0 w-full space-y-6">
          <div
            dangerouslySetInnerHTML={{
              __html: post.description?.trim().slice(0, 60) + "...",
            }}
          ></div>
          <button>
            <Link
              href={`/posts/${post.id}`}
              className="p-2 rounded-md bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 hover:dark:bg-slate-600"
            >
              Read More
            </Link>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
