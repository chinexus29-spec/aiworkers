 "use client";
import AuthGuard from "@/components/AuthGuard";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

const USD_RATE = 1350;

export default function WalletPage() {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {
      setUser(
        JSON.parse(savedUser)
      );
    }
  }, []);

  return (
    <AuthGuard>
    <main className="page-padding">
      <BackButton />

      <h1 className="text-2xl font-bold mb-5">
        Wallet
      </h1>

      {/* Wallet Balance */}

      <div className="card mb-4">
        <h3 className="text-gray-500">
          Current Balance
        </h3>

        <p className="text-3xl font-bold text-blue-500">
          $
          {(
            (user?.walletBalance || 0) /
            USD_RATE
          ).toFixed(2)}
        </p>

        <p className="text-sm text-gray-400 mt-1">
          ≈ ₦
          {(
            user?.walletBalance || 0
          ).toLocaleString()}
        </p>
      </div>

      {/* Total Earnings */}

      <div className="card">
        <h3 className="text-gray-500">
          Total Earnings
        </h3>

        <p className="text-2xl font-bold text-blue-500">
          $
          {(
            (user?.totalEarnings || 0) /
            USD_RATE
          ).toFixed(2)}
        </p>

        <p className="text-sm text-gray-400 mt-1">
          ≈ ₦
          {(
            user?.totalEarnings || 0
          ).toLocaleString()}
        </p>
      </div>
    </main>
    </AuthGuard>
  );
}