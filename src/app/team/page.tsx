 "use client";
import AuthGuard from "@/components/AuthGuard";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

const USD_RATE = 1350;

export default function TeamPage() {
  const [user, setUser] =
    useState<any>(null);

  const [referralLink, setReferralLink] =
    useState("");

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {
      const user =
        JSON.parse(savedUser);

      setUser(user);

      setReferralLink(
        `${window.location.origin}/register?ref=${user.referralCode}`
      );
    }
  }, []);

  const referralCode =
    user?.referralCode || "";

  function copyCode() {
    navigator.clipboard.writeText(
      referralCode
    );

    alert(
      "Referral code copied"
    );
  }

  function copyLink() {
    navigator.clipboard.writeText(
      referralLink
    );

    alert(
      "Referral link copied"
    );
  }

  return (
    <AuthGuard>
    <main className="page-padding space-y-5">
      

      <h1 className="text-2xl font-bold">
        Team
      </h1>

      {/* Referral Code */}

      <div className="card">
        <h2 className="font-semibold mb-3">
          Referral Code
        </h2>

        <div className="flex items-center justify-between">
          <p className="text-blue-500 text-lg font-bold">
            {referralCode}
          </p>

          <button
            onClick={copyCode}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
          >
            Copy
          </button>
        </div>
      </div>

      {/* Referral Link */}

      <div className="card">
        <h2 className="font-semibold mb-3">
          Referral Link
        </h2>

        <p className="text-blue-500 break-all text-sm">
          {referralLink}
        </p>

        <button
          onClick={copyLink}
          className="blue-btn mt-4"
        >
          Copy Link
        </button>
      </div>

      {/* Team Statistics */}

      <div className="card">
        <h2 className="font-semibold mb-4">
          Team Statistics
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">
              Referrals
            </p>

            <p className="text-2xl font-bold text-blue-500">
              {user?.referralCount || 0}
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">
              Earnings
            </p>

            <p className="text-2xl font-bold text-blue-500">
              $
              {(
                (user?.referralEarnings || 0) /
                USD_RATE
              ).toFixed(2)}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              ≈ ₦
              {(
                user?.referralEarnings || 0
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Referral Bonus Rules */}

      <div className="card">
        <h2 className="font-semibold mb-3">
          Referral Rewards
        </h2>

        <ul className="space-y-2 text-sm text-gray-400">
          <li>
            • New users receive
            {" "}
            $1.00
            {" "}
            (≈ ₦1,350) signup bonus
            when registering with your
            referral code.
          </li>

          <li>
            • You earn  20% of your
            referral's first approved
            deposit.
          </li>

          <li>
            • Referral bonuses are
            credited automatically.
          </li>
        </ul>
      </div>
    </main>
    </AuthGuard>
  );
}