import { NextResponse } from "next/server";
import {
  TransactionStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

const USD_RATE = 1350;

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const {
      withdrawalId,
    } = body;

    const withdrawal =
      await prisma.withdrawal.findUnique({
        where: {
          id: withdrawalId,
        },
      });

    if (!withdrawal) {
      return NextResponse.json(
        {
          message:
            "Withdrawal not found",
        },
        {
          status: 404,
        }
      );
    }

    if (
      withdrawal.status !==
      TransactionStatus.PENDING
    ) {
      return NextResponse.json(
        {
          message:
            "Withdrawal already processed",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.user.update({
      where: {
        id:
          withdrawal.userId,
      },

      data: {
        walletBalance: {
          increment:
            withdrawal.amount,
        },
      },
    });

    await prisma.withdrawal.update({
      where: {
        id:
          withdrawal.id,
      },

      data: {
        status:
          TransactionStatus.REJECTED,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}