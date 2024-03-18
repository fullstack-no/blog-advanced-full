import { prisma } from "@/utils/auth";
import { NextResponse } from "next/server";

export const GET = async (req: any, res: any) => {
  const { searchParams } = req.nextUrl;

  const limit = parseInt(searchParams.get("limit", 10)) || 3;
  const category = searchParams.get("category");

  try {
    const posts = await prisma.post.findMany({
      where: {
        ...(category && { category: { name: category } }),
      },

      orderBy: {
        views: "desc",
      },
      include: { category: true, user: true },

      take: limit,
    });

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify({ message: "sth went wrong" }), {
      status: 500,
    });
  }
};
