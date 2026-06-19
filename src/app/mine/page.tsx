 "use client";
import AuthGuard from "@/components/AuthGuard";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Receipt,
  Headphones,
  CreditCard,
} from "lucide-react";

export default function MinePage() {
  const items = [
    {
      name: "Wallet",
      href: "/wallet",
      icon: Wallet,
    },
    {
      name: "Deposit",
      href: "/deposit",
      icon: ArrowDownCircle,
    },
    {
      name: "Withdraw",
      href: "/withdraw",
      icon: ArrowUpCircle,
    },
    {
      name: "Transactions",
      href: "/transactions",
      icon: Receipt,
    },
    {
      name: "Account Details",
      href: "/payment-details",
      icon: CreditCard,
    },
    {
      name: "Customer Service",
      href: "/support",
      icon: Headphones,
    },
  ];

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

  const [error, setError] =
  useState("");
  
  const router = useRouter();

  function logout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <AuthGuard>
    <main className="page-padding">
      <h1 className="text-2xl font-bold mb-5">
        Mine
      </h1>

      <div className="card mb-4">
        <h2 className="text-lg font-bold">
          {user?.fullName || "Guest"}
        </h2>

        <p className="text-sm text-gray-500">
          {user?.phoneNumber}
        </p>

        <p className="text-blue-500 mt-2">
          Referral Code:{" "}
          {user?.referralCode}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => {
          const Icon =
            item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="card flex flex-col items-center py-6"
            >
              <Icon
  size={30}
  className={
    item.name === "Account Details"
      ? "text-yellow-500"
      : "text-blue-500"
  }
/>

              <span className="mt-3 font-medium text-center">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-6">
        <button
          onClick={logout}
          className="w-full bg-blue-700 hover:bg-blue-900 text-white rounded-xl p-4 font-semibold transition"
        >
          Logout
        </button>
      </div>
    </main>
    </AuthGuard>
  );
}
