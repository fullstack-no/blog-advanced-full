"use client";

import Image from "next/image";
import { Pagination } from "./Pagination";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type CardListProps = {
  category?: string;
};

export const CardList = ({ category }: CardListProps) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await fetch(
          `/api/posts?page=${page}` +
            (category ? `&category=${category}` : "") +
            `&order=createdAt`
        );
        const data = await resp.json();

        setPosts(data?.posts || []);
        setTotal(data?.count || 0);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [page]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Recent Posts</h1>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.id}>
            <div className="flex items-center gap-8">
              <Image
                src={post.image || "/fall.jpg"}
                alt=""
                width={700}
                height={700}
                className="grow-0 basis-1/2 max-h-80 object-contain"
              />
              <div className="grow-0 basis-1/2 space-y-8 py-4">
                <div>
                  <span className="text-slate-500 text-sm">
                    {post.createdAt?.substring(0, 10)}
                  </span>
                  {" - "}
                  <span className="text-red-500 uppercase">
                    {post.category.name}
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl font-medium leading-7">
                    {post.title}
                  </h1>
                  <div>
                    <small>{post.user.email}</small>
                  </div>
                </div>
                <p
                  className="text-slate-500"
                  dangerouslySetInnerHTML={{
                    __html: post.description?.trim()?.substring(0, 25),
                  }}
                ></p>
                <button
                  className="underline underline-offset-4 decoration-dashed decoration-red-400"
                  onClick={() => router.push(`/posts/${post.id}`)}
                >
                  Read More
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Pagination page={page} total={total} setPage={setPage} />
    </div>
  );
};
