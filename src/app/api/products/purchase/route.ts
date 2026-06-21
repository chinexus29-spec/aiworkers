import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const USD_RATE = 1350;

const plans = [
  {
    id: 1,
    name: "AI Content Creation",
    price: 10,
    income: 0.7,
  },

  {
    id: 2,
    name: "AI Chatbots",
    price: 23,
    income: 2,
  },

  {
    id: 3,
    name: "AI-Powered Education & Tutoring",
    price: 41,
    income: 3.8,
  },

  {
    id: 4,
    name: "AI Marketing Automation",
    price: 90,
    income: 10,
  },

  {
    id: 5,
    name: "AI Cybersecurity Solutions",
    price: 160,
    income: 18.5,
  },

  {
    id: 6,
    name: "AI Robotics & Industrial Automation",
    price: 340,
    income: 40,
  },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, planId } = body;

    const user =
      await prisma.user.findUnique({
        where: { id: userId },
      });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const plan = plans.find(
      (p) => p.id === planId
    );

    if (!plan) {
      return NextResponse.json(
        {
          message: "Plan not found",
        },
        { status: 404 }
      );
    }

    // Prevent duplicate purchase

    const existingPlan =
      await prisma.purchasedPlan.findFirst({
        where: {
          userId,
          planName: plan.name,
          active: true,
        },
      });

    if (existingPlan) {
      return NextResponse.json(
        {
          message:
            "You have already purchased this plan",
        },
        { status: 400 }
      );
    }

    const cost =
      plan.price * USD_RATE;

    if (
      user.walletBalance < cost
    ) {
      return NextResponse.json(
        {
          message:
            "Insufficient balance",
        },
        { status: 400 }
      );
    }

    // Deduct balance

    await prisma.user.update({
      where: { id: user.id },

      data: {
        walletBalance: {
          decrement: cost,
        },
      },
    });

    // Set expiration date

    const expiresAt =
      new Date();

    expiresAt.setDate(
      expiresAt.getDate() + 30
    );

    // Save purchased plan

    await prisma.purchasedPlan.create({
      data: {
        userId: user.id,

        planName: plan.name,

        purchasePrice:
          plan.price,

        dailyIncome:
          plan.income,

        expiresAt,
      },
    });

    return NextResponse.json({
      message:
        "Plan purchased successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message:
          "Purchase failed",
      },
      { status: 500 }
    );
  }
}