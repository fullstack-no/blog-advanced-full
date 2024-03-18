import { prisma } from "@/utils/auth";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest, { params }: any) => {
  try {
    const { id } = params;

    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        views: { increment: 1 },
      },
      include: {
        category: true,
        user: true,
      },
    });

    return new NextResponse(JSON.stringify(post), {
      status: 200,
      headers: {
        "Content-Security-Policy": "script-src 'self' 'strict-dynamic';",
      },
    });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify({ message: "Smt went wrong" }), {
      status: 500,
    });
  }
};

export const PUT = async (req: Request, { params }: any) => {
  const { id } = params;

  const body = await req.json();

  const { title, description, categoryId, image } = body;

  try {
    const newPost = await prisma.post.update({
      where: {
        id,
      },

      data: {
        ...(image && { image }),
        title,
        description,
        categoryId,
      },
    });

    return new NextResponse(JSON.stringify(newPost), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify({ message: "Smt went wrong" }), {
      status: 500,
    });
  }
};

export const DELETE = async (req: Request, { params }: any) => {
  const { id } = params;

  try {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify({ message: "Smt went wrong" }), {
      status: 500,
    });
  }
};
