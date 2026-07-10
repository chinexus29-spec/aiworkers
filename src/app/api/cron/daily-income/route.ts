import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
TransactionStatus,
TransactionType,
} from "@prisma/client";

export async function GET() {
try {
const now = new Date();


const plans =
  await prisma.purchasedPlan.findMany({
    where: {
      active: true,
    },

    include: {
      user: true,
    },
  });

for (const plan of plans) {
  // deactivate expired plans

  if (plan.expiresAt <= now) {
    await prisma.purchasedPlan.update({
      where: {
        id: plan.id,
      },

      data: {
        active: false,
      },
    });

    continue;
  }

  // first payment = 24 hrs after purchase

  const lastPayment =
    plan.lastClaimedAt ||
    plan.purchasedAt;

  const hoursPassed =
    (now.getTime() -
      new Date(lastPayment).getTime()) /
    (1000 * 60 * 60);

  if (hoursPassed >= 24) {
    // credit wallet

    await prisma.user.update({
      where: {
        id: plan.userId,
      },

      data: {
        walletBalance: {
          increment:
            plan.dailyIncome * 1350,
        },

        totalEarnings: {
          increment:
            plan.dailyIncome * 1350 ,
        },
      },
    });

    // record transaction

    await prisma.transaction.create({
      data: {
        userId: plan.userId,

        amount:
          plan.dailyIncome,

        type:
          TransactionType.DAILY_EARNING,
        
        status:
          TransactionStatus.APPROVED,

        description: `Daily income from ${plan.planName}`,
      },
    });

    // update payment time

    await prisma.purchasedPlan.update({
      where: {
        id: plan.id,
      },

      data: {
        lastClaimedAt: now,
      },
    });
  }
}

return NextResponse.json({
  success: true,
});


} catch (error) {
console.log(error);


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
