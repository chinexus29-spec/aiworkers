import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
req: Request
) {
try {
const { searchParams } =
new URL(req.url);


const userId =
  searchParams.get("userId");

if (!userId) {
  return NextResponse.json(
    {
      message: "User ID is required",
    },
    { status: 400 }
  );
}

const plans =
  await prisma.purchasedPlan.findMany({
    where: {
      userId,
      active: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

return NextResponse.json(plans);


} catch (error) {
console.log(error);


return NextResponse.json(
  {
    message:
      "Failed to load plans",
  },
  { status: 500 }
);


}
}
