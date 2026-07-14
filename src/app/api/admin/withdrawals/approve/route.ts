import { NextResponse } from "next/server";
import {
  TransactionStatus,
  TransactionType,
} from "@prisma/client";

const USD_RATE = 1350;

import { prisma } from "@/lib/prisma";

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
      withdrawal.status ===
      TransactionStatus.APPROVED
    ) {
      return NextResponse.json(
        {
          message:
            "Already approved",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.withdrawal.update({
      where: {
        id: withdrawal.id,
      },

      data: {
        status:
          TransactionStatus.APPROVED,
      },
    });

    await prisma.transaction.create({
      data: {
        userId:
          withdrawal.userId,

        amount:
          withdrawal.amount/USD_RATE,

        type:
          TransactionType.WITHDRAWAL,

        status:
          TransactionStatus.APPROVED,

        description:
          "Withdrawal approved",
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