import { getAuthSession, prisma } from "@/utils/auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const post = searchParams.get("post");

  const query = {
    where: {
      post: {
        ...(post && { id: post }),
      },
    },
    include: {
      user: true,
    },
  };

  try {
    const comments = await prisma.comment.findMany(query);

    return new NextResponse(JSON.stringify(comments), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession();
    const body = await req.json();

    if (!body.post) throw new Error("missing post");

    const { content, post } = body;

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: post,
        userEmail: session?.user?.email as any,
      },
    });

    return new NextResponse(JSON.stringify(comment), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
