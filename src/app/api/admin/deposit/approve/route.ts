import { NextResponse } from "next/server";
import {
  TransactionStatus,
  TransactionType,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

const USD_RATE = 1350;

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const { depositId } = body;

    const deposit =
      await prisma.deposit.findUnique({
        where: {
          id: depositId,
        },

        include: {
          user: {
            include: {
              referredBy: true,
            },
          },
        },
      });

    if (!deposit) {
      return NextResponse.json(
        {
          message:
            "Deposit not found",
        },
        {
          status: 404,
        }
      );
    }

    if (
      deposit.status ===
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

    // Convert USD deposit to Naira

    const nairaAmount =
      deposit.amount *
      USD_RATE;

    // Credit depositor

    await prisma.user.update({
      where: {
        id: deposit.userId,
      },

      data: {
        walletBalance: {
          increment:
            nairaAmount,
        },

        totalEarnings: {
          increment:
            nairaAmount,
        },
      },
    });

    // Approve deposit

    await prisma.deposit.update({
      where: {
        id: deposit.id,
      },

      data: {
        status:
          TransactionStatus.APPROVED,
      },
    });

    // Create deposit transaction

    await prisma.transaction.create({
      data: {
        userId:
          deposit.userId,

        amount:
          nairaAmount,

        type:
          TransactionType.DEPOSIT,

        status:
          TransactionStatus.APPROVED,

        description: `USDT Deposit Approved ($${deposit.amount})`,
      },
    });

    // First deposit referral bonus

    if (
      deposit.user.referredBy &&
      !deposit.user
        .firstDepositBonusPaid
    ) {
      const commission =
        nairaAmount * 0.2;

      await prisma.user.update({
        where: {
          id:
            deposit.user
              .referredBy.id,
        },

        data: {
          walletBalance: {
            increment:
              commission,
          },

          totalEarnings: {
            increment:
              commission,
          },

          referralEarnings: {
            increment:
              commission,
          },
        },
      });

      await prisma.transaction.create({
        data: {
          userId:
            deposit.user
              .referredBy.id,

          amount:
            commission,

          type:
            TransactionType.REFERRAL_BONUS,

          status:
            TransactionStatus.APPROVED,

          description:
            " 20% first deposit referral bonus",
        },
      });

      await prisma.user.update({
        where: {
          id:
            deposit.user.id,
        },

        data: {
          firstDepositBonusPaid:
            true,
        },
      });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Approval failed",
      },
      {
        status: 500,
      }
    );
  }
}