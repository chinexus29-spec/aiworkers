"use server";

import { prisma } from "@/lib/prisma";

export async function createUser(
  fullName: string,
  phoneNumber: string,
  pin: string
) {
  return prisma.user.create({
    data: {
      fullName,
      phoneNumber,
      pin,

      referralCode:
        "AIW" +
        Math.floor(
          100000 +
            Math.random() * 900000
        ),
    },
  });
}
export async function loginUser(
  phoneNumber: string,
  pin: string
) {
  return prisma.user.findFirst({
    where: {
      phoneNumber,
      pin,
    },
  });
}