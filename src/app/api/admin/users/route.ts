import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users =
      await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          fullName: true,
          phoneNumber: true,
          walletBalance: true,
          totalEarnings: true,
          referralCode: true,
          referralCount: true,
          suspended: true,
          createdAt: true,
        },
      });

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed to load users",
      },
      {
        status: 500,
      }
    );
  }
}