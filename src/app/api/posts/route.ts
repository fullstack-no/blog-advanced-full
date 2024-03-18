import { getAuthSession, prisma } from "@/utils/auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const TAKE = 2;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") as string) || 1;
  const category = searchParams.get("category");
  const order = searchParams.get("order") || "";

  const skip = (page - 1) * TAKE;

  const query = {
    take: TAKE,
    skip,
    where: {
      category: {
        ...(category && { name: category }),
      },
    },
    orderBy: {
      ...(order && { [order]: "desc" }),
    },
    include: {
      category: true,
      user: true,
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
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

    if (!body.categoryId) throw new Error("missing cate");

    const post = await prisma.post.create({
      data: {
        ...body,
        userEmail: session?.user?.email,
      },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
