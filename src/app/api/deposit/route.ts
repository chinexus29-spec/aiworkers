import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      userId,
      amount,
    } = body;

    if (!userId || !amount) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 }
      );
    }

    const deposit =
      await prisma.deposit.create({
        data: {
          userId,
          amount: Number(amount),
        },
      });

    return NextResponse.json({
      success: true,
      deposit,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to submit deposit",
      },
      { status: 500 }
    );
  }
}