import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const USD_RATE = 1350;
const MIN_WITHDRAWAL = 5 * USD_RATE;

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const {
      userId,
      amount,
      method,
    } = body;

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
        {
          status: 404,
        }
      );
    }

    const nairaAmount =
      Number(amount) *
      USD_RATE;

    if (
      nairaAmount <
      MIN_WITHDRAWAL
    ) {
      return NextResponse.json(
        {
          message:
            "Minimum withdrawal is $5",
        },
        {
          status: 400,
        }
      );
    }

    if (
      nairaAmount >
      user.walletBalance
    ) {
      return NextResponse.json(
        {
          message:
            "Insufficient balance",
        },
        {
          status: 400,
        }
      );
    }

    const fee =
      nairaAmount * 0.2;

    const amountToReceive =
      nairaAmount - fee;

    await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        walletBalance: {
          decrement:
            nairaAmount,
        },
      },
    });

    await prisma.withdrawal.create({
      data: {
        amount:
          nairaAmount,

        fee,

        amountToReceive,

        method,

        userId,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
