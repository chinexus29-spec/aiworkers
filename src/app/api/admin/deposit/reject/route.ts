import { NextResponse } from "next/server";
import {
  TransactionStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  const body =
    await req.json();

  const { depositId } = body;

  await prisma.deposit.update({
    where: {
      id: depositId,
    },

    data: {
      status:
        TransactionStatus.REJECTED,
    },
  });

  return NextResponse.json({
    success: true,
    message:
      "Deposit rejected",
  });
}