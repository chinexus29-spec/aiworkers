"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";

export default function AdminTicketsPage() {
const [tickets, setTickets] =
useState<any[]>([]);

async function loadTickets() {
const response =
await fetch(
"/api/admin/tickets"
);


const data =
  await response.json();

setTickets(data);


}

useEffect(() => {
loadTickets();
}, []);

async function resolveTicket(
ticketId: string
) {
const response =
await fetch(
"/api/admin/tickets/resolve",
{
method: "POST",


      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        ticketId,
      }),
    }
  );

if (response.ok) {
  alert(
    "Ticket resolved"
  );

  loadTickets();
}


}

return ( <AuthGuard> <main className="page-padding space-y-4">


    <h1 className="text-2xl font-bold">
      Support Tickets
    </h1>

    {tickets.length === 0 && (
      <p>
        No tickets available.
      </p>
    )}

    {tickets.map((ticket) => (
      <div
        key={ticket.id}
        className="card space-y-3"
      >
        <div className="flex justify-between">
          <h2 className="font-bold">
            {ticket.subject}
          </h2>

          <span
            className={
              ticket.status ===
              "RESOLVED"
                ? "text-green-500"
                : "text-yellow-500"
            }
          >
            {ticket.status}
          </span>
        </div>

        <p className="text-sm">
          User:
          {" "}
          {ticket.user.fullName}
        </p>

        <p className="text-sm">
          Phone:
          {" "}
          {ticket.user.phoneNumber}
        </p>

        <p className="text-gray-400">
          {ticket.message}
        </p>

        <p className="text-xs text-gray-500">
          {new Date(
            ticket.createdAt
          ).toLocaleString()}
        </p>

        {ticket.status !==
          "RESOLVED" && (
          <button
            onClick={() =>
              resolveTicket(
                ticket.id
              )
            }
            className="cyan-btn"
          >
            Mark as Resolved
          </button>
        )}
      </div>
    ))}

  </main>
</AuthGuard>


);
}
