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
      subject,
      message,
    } = body;

    await prisma.supportTicket.create({
      data: {
        userId,
        subject,
        message,
      },
    });

    return NextResponse.json({
      message:
        "Ticket submitted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message:
          "Failed to submit ticket",
      },
      { status: 500 }
    );
  }
}