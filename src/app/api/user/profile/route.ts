import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const { userId } = body;

    const user =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: user.id,
      fullName: user.fullName,
      phoneNumber:
        user.phoneNumber,
      walletBalance:
        user.walletBalance,
      totalEarnings:
        user.totalEarnings,
      referralCode:
        user.referralCode,
      referralCount:
        user.referralCount,
      referralEarnings: 
      user.referralEarnings,
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "Failed to load profile",
      },
      { status: 500 }
    );
  }
}