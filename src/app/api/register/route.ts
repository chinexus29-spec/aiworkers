import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import {
  TransactionStatus,
  TransactionType,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

const USD_RATE = 1350;
const SIGNUP_BONUS = USD_RATE; // $1

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      phoneNumber,
      pin,
      referralCode,
    } = body;

    console.log(
      "Entered code:",
      referralCode
    );

    if (
      !fullName ||
      !phoneNumber ||
      !pin
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          phoneNumber,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Phone number already exists",
        },
        {
          status: 400,
        }
      );
    }

    let referrer = null;

    if (referralCode?.trim()) {
      const cleanedCode =
        referralCode
          .trim()
          .toUpperCase();

      referrer =
        await prisma.user.findUnique({
          where: {
            referralCode:
              cleanedCode,
          },
        });

      if (!referrer) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid referral code",
          },
          {
            status: 400,
          }
        );
      }
    }

    const hashedPin =
      await bcrypt.hash(pin, 10);

    const generatedReferralCode =
      "AIW" +
      Math.random()
        .toString(36)
        .substring(2, 5)
        .toUpperCase();

    const user =
      await prisma.user.create({
        data: {
          fullName,
          phoneNumber,
          pin: hashedPin,

          walletBalance:
            referrer
              ? SIGNUP_BONUS
              : 0,

          totalEarnings:
            referrer
              ? SIGNUP_BONUS
              : 0,

          referralCode:
            generatedReferralCode,

          referredById:
            referrer?.id,
        },
      });

    if (referrer) {
      await prisma.transaction.create({
        data: {
          userId: user.id,

          amount:
            SIGNUP_BONUS,

          type:
            TransactionType.SIGNUP_BONUS,

          status:
            TransactionStatus.APPROVED,

          description:
            "Referral signup bonus",
        },
      });

      await prisma.user.update({
        where: {
          id: referrer.id,
        },

        data: {
          referralCount: {
            increment: 1,
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      message:
        "Registration successful",
      referralCode:
        generatedReferralCode,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Registration failed",
      },
      {
        status: 500,
      }
    );
  }
}
