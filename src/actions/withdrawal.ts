"use server";

import { prisma } from "@/lib/prisma";

export async function createWithdrawal(
  userId: string,
  amount: number
) {
  return prisma.transaction.create({
    data: {
      userId,
      amount,

      type: "WITHDRAWAL",

      status: "PENDING",

      description:
        "Withdrawal Request",
    },
  });
}