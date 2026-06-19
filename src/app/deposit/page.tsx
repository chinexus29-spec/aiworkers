 "use client";
import AuthGuard from "@/components/AuthGuard";

import Link from "next/link";
import BackButton from "@/components/BackButton";
import {
  Wallet,
  Landmark,
  ChevronRight,
} from "lucide-react";

export default function DepositPage() {
  return (
    <AuthGuard>
    <main className="page-padding space-y-5">
      <BackButton />

      <h1 className="text-2xl font-bold">
        Deposit
      </h1>

      <p className="text-gray-400 text-sm">
        Choose your preferred deposit
        method.
      </p>

      {/* USDT Deposit */}

      <Link
        href="/deposit/usdt"
        className="block"
      >
        <div className="card hover:border-blue-500 transition border border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600/20 p-3 rounded-xl">
                <Wallet
                  size={28}
                  className="text-blue-500"
                />
              </div>

              <div>
                <h2 className="font-bold text-lg">
                  Deposit with USDT
                </h2>

                <p className="text-sm text-gray-400">
                  TRC20 Network
                </p>
              </div>
            </div>

            <ChevronRight
              className="text-gray-500"
            />
          </div>
        </div>
      </Link>

      {/* Naira Deposit */}

      <div className="card border border-slate-800 opacity-70">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600/20 p-3 rounded-xl">
              <Landmark
                size={28}
                className="text-blue-500"
              />
            </div>

            <div>
              <h2 className="font-bold text-lg">
                Deposit with Naira
              </h2>

              <p className="text-sm text-gray-400">
                Coming Soon...
              </p>
            </div>
          </div>

          <span className="text-xs bg-gray-800 px-3 py-1 rounded-full">
            Coming Soon
          </span>
        </div>
      </div>
    </main>
    </AuthGuard>
  );
}