import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const deposits =
    await prisma.deposit.findMany({
      include: {
        user: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json(
    deposits
  );
}