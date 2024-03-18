"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type CommentProps = {
  post: string;
};

export const Comment = ({ post }: CommentProps) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [change, setChange] = useState(0);

  const { status } = useSession();

  const mutate = () => {
    setChange((change) => change + 1);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const url = process.env.SERVER_URL + `/api/comments?post=${post}`;

        const resp = await fetch(url);
        const data = await resp.json();
        setComments(data);
      } catch (error) {}
    };

    getData();
  }, [change]);

  async function handleComment() {
    const resp = await fetch(process.env.SERVER_URL + "/api/comments", {
      method: "POST",
      body: JSON.stringify({ content: comment, post }),
    });
    if (resp.ok) {
      setComment("");
      mutate();
    } else toast("server error", { type: "error" });
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium">Comments</h1>

      {status === "authenticated" ? (
        <form>
          <div className="flex items-center gap-8">
            <textarea
              name="comment"
              className="grow px-4 py-2 border border-slate-500 rounded-md text-black text-lg min-h-32"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="px-3 py-2 bg-transparent rounded-md hover:bg-sky-500 border border-slate-500"
              type="button"
              onClick={handleComment}
            >
              Send
            </button>
          </div>
        </form>
      ) : (
        <div className="py-8 px-4 text-center w-full bg-slate-200 dark:bg-slate-600">
          <Link href="/login">Login to comment</Link>
        </div>
      )}

      <ul className="space-y-6">
        {comments.map((c) => (
          <li key={c.id}>
            <div className="space-y-2">
              <div className="flex items-center gap-6">
                <Image
                  src={c.user?.image || "/fall.jpg"}
                  alt=""
                  width={30}
                  height={30}
                />
                <div>
                  <div className="text-lg font-bold">{c.user?.name}</div>
                  <small>{c.createdAt?.substring(0, 10)}</small>
                </div>
              </div>

              <p>{c.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
