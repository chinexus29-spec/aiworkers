"use client";

import AuthGuard from "@/components/AuthGuard";
import { useState } from "react";

export default function TicketPage() {
  const [subject, setSubject] =
    useState("");

  const [message, setMessage] =
    useState("");

  async function submitTicket() {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const response = await fetch(
      "/api/support/create",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          userId: user.id,
          subject,
          message,
        }),
      }
    );

    const data =
      await response.json();

    alert(data.message);

    if (response.ok) {
      setSubject("");
      setMessage("");
    }
  }

  return (
    <AuthGuard>
      <main className="page-padding space-y-4">

        <h1 className="text-2xl font-bold">
          Create Support Ticket
        </h1>

        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
          className="w-full border rounded-xl p-3"
        />

        <textarea
          placeholder="Describe your issue"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="w-full border rounded-xl p-3 h-40"
        />

        <button
          onClick={submitTicket}
          className="cyan-btn w-full"
        >
          Submit Ticket
        </button>

      </main>
    </AuthGuard>
  );
}
