import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
req: Request
) {
try {
const body =
await req.json();


const { ticketId } = body;

await prisma.supportTicket.update({
  where: {
    id: ticketId,
  },

  data: {
    status: "RESOLVED",
  },
});

return NextResponse.json({
  success: true,
});


} catch (error) {
console.log(error);


return NextResponse.json(
  {
    message:
      "Failed to resolve ticket",
  },
  { status: 500 }
);


}
}
