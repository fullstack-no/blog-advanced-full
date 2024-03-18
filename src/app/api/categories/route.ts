import { prisma } from "@/utils/auth";
import { NextResponse } from "next/server";

export const GET = async (res: Request) => {
  try {
    const categories = await prisma.category.findMany();

    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
