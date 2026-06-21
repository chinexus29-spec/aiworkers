import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
try {
const tickets =
await prisma.supportTicket.findMany({
include: {
user: true,
},


    orderBy: {
      createdAt: "desc",
    },
  });

return NextResponse.json(tickets);


} catch (error) {
console.log(error);


return NextResponse.json(
  {
    message:
      "Failed to load tickets",
  },
  { status: 500 }
);


}
}
