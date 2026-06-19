"use server";

import { prisma } from "@/lib/prisma";

export async function createDeposit(
  userId: string,
  amount: number
) {
  return prisma.transaction.create({
    data: {
      userId,
      amount,

      type: "DEPOSIT",

      status: "PENDING",

      description:
        "Deposit Request",
    },
  });
}