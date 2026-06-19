import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const {
      userId,
      amount,
    } = body;

    if (
      !userId ||
      !amount
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.deposit.create({
      data: {
        amount:
          Number(amount),

        userId,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Deposit submitted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Deposit failed",
      },
      {
        status: 500,
      }
    );
  }
}