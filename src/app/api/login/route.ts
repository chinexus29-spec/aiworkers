import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      phoneNumber,
      pin,
    } = body;

    const user =
      await prisma.user.findUnique({
        where: {
          phoneNumber,
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

    const valid =
      await bcrypt.compare(
        pin,
        user.pin
      );

    if (!valid) {
      return NextResponse.json(
        {
          message:
            "Invalid PIN",
        },
        { status: 401 }
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
    });
  }  catch (error) {
  console.error("LOGIN ERROR:", error);

  return NextResponse.json(
    {
      message: String(error),
    },
    { status: 500 }
  );
}
}
