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

      bankName,
      accountNumber,
      accountName,

      walletAddress,
      walletNetwork,
    } = body;

    const updateData = {
      bankName,
      accountNumber,
      accountName,
      walletAddress,
      walletNetwork,
    } as any;

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
    });
  } catch {
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