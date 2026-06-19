import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const withdrawals =
      await prisma.withdrawal.findMany({
        include: {
          user: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      withdrawals
    );
  } catch (error) {
    console.error(
      "Failed to load withdrawals:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load withdrawals",
      },
      {
        status: 500,
      }
    );
  }
}