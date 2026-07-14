 "use client";
import AuthGuard from "@/components/AuthGuard";
import BalanceCard from "@/components/BalanceCard";
import ActionCard from "@/components/ActionCard";


import { useEffect, useState } from "react";
import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  FileText,
} from "lucide-react";

export default function HomePage() {
  const [user, setUser] =
  useState<any>(null);

useEffect(() => {
  async function loadUser() {
    const savedUser =
      localStorage.getItem("user");

    if (!savedUser) return;

    const localUser =
      JSON.parse(savedUser);

    const response =
      await fetch(
        "/api/user/profile",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId:
              localUser.id,
          }),
        }
      );

    const freshUser =
      await response.json();

    localStorage.setItem(
      "user",
      JSON.stringify(
        freshUser
      )
    );

    setUser(freshUser);
  }

  loadUser();
}, []);
  return (
    <AuthGuard>
    
    <main className="page-padding space-y-5">
      {/* Welcome Banner */}

      <section className="bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-2xl p-5">
        <h2 className="text-2xl font-bold">
          Welcome
        {user
          ? `, ${user.fullName}`
        : ""}
  </h2>

        <p className="mt-2 text-sm">
          Build your portfolio of AI worker bots, earn daily rewards, and manage your investments with confidence—all from one place.
        </p>
      </section>

      {/* Balance */}

     <BalanceCard
  balance={
    user?.walletBalance || 0
  }
  earnings={
    user?.totalEarnings || 0
  }
/>

{(
  user?.phoneNumber ===
    "11111111111" ||
  user?.phoneNumber ===
    "22222222222"
) && (
  <a
    href="/admin"
    className="card block"
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-bold text-lg">
          Admin Panel
        </h3>

        <p className="text-sm text-gray-400">
          Manage deposits,
          withdrawals and users
        </p>
      </div>

      <div className="text-blue-500 text-2xl">
        →
      </div>
    </div>
  </a>
)}

      {/* Quick Actions */}

      <section>
        <h3 className="font-semibold mb-3">
          Quick Actions
        </h3>

        <div className="grid grid-cols-4 gap-3">
          <ActionCard
            title="Wallet"
            href="/wallet"
            icon={Wallet}
          />

          <ActionCard
            title="Deposit"
            href="/deposit"
            icon={ArrowDownCircle}
          />

          <ActionCard
            title="Withdraw"
            href="/withdraw"
            icon={ArrowUpCircle}
          />

          <ActionCard
            title="Records"
            href="/transactions"
            icon={FileText}
          />
        </div>
      </section>

      {/* Company Intro */}

      <section className="card">
        <h3 className="font-semibold mb-3">
          Latest Announcement
        </h3>

        <p className="text-sm text-gray-300 leading-6">
   🎉 We’re excited to announce that the AI Workers community has now grown to over 2,000 registered members!

Thank you for being part of our journey. Your trust and support continue to inspire us as we improve the platform and introduce new opportunities. We remain committed to providing a reliable experience, timely support, and steady platform improvements for every member.

Thank you for growing with us.
        </p>
      </section>

      {/* Announcements */}

      <section className="card">
        <h3 className="font-semibold mb-3">
          About AI Workers
        </h3>

        <p className="text-sm text-gray-300">
          AI Workers is an AI-powered digital earning platform that gives members access to virtual AI worker bots designed to generate daily returns throughout their active plan period.

Our goal is to make digital earning simple, transparent, and accessible by combining AI-themed investment products with a secure, easy-to-use platform. Members can purchase AI worker plans, track earnings, grow their network through referrals, and manage their accounts from a single dashboard.

We continue to improve our services by introducing new AI worker categories, strengthening platform security, and providing responsive customer support to ensure the best possible experience for our community.
        </p>
      </section>
    </main>
    </AuthGuard>
  );
}