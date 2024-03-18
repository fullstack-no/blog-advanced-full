import { Menu } from "@/app/components";
import { Comment } from "@/app/components/Comment";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DeleteBtn } from "./DeleteBtn";
import { useSession } from "next-auth/react";
import { getAuthSession } from "@/utils/auth";

const PostPage = async ({ params }: any) => {
  const { id } = params;
  const session = await getAuthSession();

  const resp = await fetch(process.env.SERVER_URL + `/api/posts/${id}`, {
    cache: "no-store",
  });
  const post = await resp.json();

  return (
    <div className="space-y-16">
      {session?.user?.email === post?.user?.email && (
        <div className="space-x-4">
          <Link href={`${id}/edit`}>
            <button className="px-3 py-2  rounded-md border border-slate-200 bg-yellow-500 hover:bg-yellow-400 dark:hover:bg-yellow-600">
              Edit
            </button>
          </Link>

          <DeleteBtn id={id} />
        </div>
      )}
      <div className="flex items-center gap-8  *:basis-1/2 *:grow-0">
        <div className="space-y-8">
          <h1 className="text-6xl font-bold">{post.title}</h1>
          <div className="flex items-center gap-4">
            <Image
              src={post.user?.image}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />

            <div className="space-y-4">
              <div className="text-lg font-bold capitalize">
                {post.user.name}
              </div>
              <small>{post.createdAt?.substring(0, 10)}</small>
            </div>
          </div>
        </div>

        <Image
          src={post.image || "/fall.jpg"}
          alt=""
          width={700}
          height={700}
          className="max-h-60 object-contain"
        />
      </div>

      <div className="flex gap-8">
        <div className="basis-3/4 grow-0 space-y-12">
          <div
            dangerouslySetInnerHTML={{
              __html: `${post.description}`,
            }}
          />

          <Comment post={post.id} />
        </div>

        <div className="basis-1/4 grow-0">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
