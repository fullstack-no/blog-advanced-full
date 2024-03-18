"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type MenuProps = {
  category?: string;
};

const bgColors = [
  "bg-red-500",
  "bg-sky-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-violet-500",
];

export const Menu = ({ category }: MenuProps) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const urls = [
          `/api/posts/popular${category ? `?category=${category}` : ""}`,
          `/api/categories`,
        ];

        const resps = await Promise.all(
          urls.map((url) => fetch(process.env.SERVER_URL + url))
        );

        const datas = await Promise.all(resps.map((resp) => resp.json()));

        setPosts(datas[0]);
        setCategories(datas[1]);
      } catch (error) {
        console.log(error);
        toast("cant load data", { type: "error" });
      }
    };

    getData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-8">
        <div>
          <small className="text-slate-500">what's hot</small>
          <h1 className="text-2xl font-bold">Most Popular</h1>
        </div>

        <ul className="space-y-8">
          {posts.map((post, idx) => (
            <li key={post.id}>
              <div className="space-y-2">
                <div
                  className={`py-0.5 px-3 rounded-full  w-fit ${bgColors[idx]}`}
                >
                  {post.category.name}
                </div>
                <h1 className="text-2xl font-bold">
                  <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </h1>
                <div
                  className="text-slate-700 dark:text-slate-200"
                  dangerouslySetInnerHTML={{
                    __html: post.description.slice(0, 20) + "...",
                  }}
                ></div>
                <small>
                  <span>{post.user?.name}</span>
                  {" - "}
                  <span className="text-slate-500">
                    {post.createdAt?.slice(0, 10)}
                  </span>
                </small>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-8">
        <div>
          <small className="text-slate-500">Discover by topic</small>
          <h1 className="text-2xl font-bold">Categories</h1>
        </div>

        <ul className="flex flex-wrap  items-center gap-4">
          {categories.map((category, idx) => (
            <li key={idx}>
              <Link
                href={process.env.SERVER_URL + "/categories/" + category.slug}
              >
                <div className={`px-3 py-2 rounded-md ${bgColors[idx]}`}>
                  styles
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-8">
        <div>
          <small className="text-slate-500">Chosen By Editor</small>
          <h1 className="text-2xl font-bold">Editors pick</h1>
        </div>

        <ul className="space-y-8">
          <li>
            <div className="space-y-2">
              <div className="py-0.5 px-3 rounded-full bg-red-500 w-fit">
                travel
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src="/fall.jpg"
                  alt=""
                  width={20}
                  height={20}
                  className="w-8 h-8 rounded-full"
                />

                <div className="space-y-3">
                  <p className="text-slate-700 dark:text-slate-200">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero non fugi
                  </p>
                  <small>
                    <span>Joshep Owen</span>
                    {" - "}
                    <span className="text-slate-500">10.08.2023</span>
                  </small>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className="space-y-2">
              <div className="py-0.5 px-3 rounded-full bg-red-500 w-fit">
                travel
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src="/fall.jpg"
                  alt=""
                  width={20}
                  height={20}
                  className="w-8 h-8 rounded-full"
                />

                <div className="space-y-3">
                  <p className="text-slate-700 dark:text-slate-200">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero non fugi
                  </p>
                  <small>
                    <span>Joshep Owen</span>
                    {" - "}
                    <span className="text-slate-500">10.08.2023</span>
                  </small>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className="space-y-2">
              <div className="py-0.5 px-3 rounded-full bg-red-500 w-fit">
                travel
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src="/fall.jpg"
                  alt=""
                  width={20}
                  height={20}
                  className="w-8 h-8 rounded-full"
                />

                <div className="space-y-3">
                  <p className="text-slate-700 dark:text-slate-200">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero non fugi
                  </p>
                  <small>
                    <span>Joshep Owen</span>
                    {" - "}
                    <span className="text-slate-500">10.08.2023</span>
                  </small>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
