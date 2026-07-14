"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";

export default function AdminUsersPage() {
  const [users, setUsers] =
    useState<any[]>([]);

  async function loadUsers() {
    try {
      const response =
        await fetch(
          "/api/admin/users"
        );

      const data =
        await response.json();

      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <AdminGuard>
      <main className="page-padding">
        <h1 className="text-2xl font-bold mb-6">
          Registered Users
        </h1>

        <div className="space-y-5">
          {users.map((user) => (
            <div
              key={user.id}
              className="card"
            >
              <h2 className="text-lg font-bold">
                {user.fullName}
              </h2>

              <div className="space-y-2 mt-3">

                <p>
                  <span className="font-semibold">
                    Phone:
                  </span>{" "}
                  {user.phoneNumber}
                </p>

                <p>
                  <span className="font-semibold">
                    Wallet:
                  </span>{" "}
                  ₦
                  {Number(
                    user.walletBalance
                  ).toLocaleString()}
                </p>

                <p>
                  <span className="font-semibold">
                    Total Earnings:
                  </span>{" "}
                  ₦
                  {Number(
                    user.totalEarnings
                  ).toLocaleString()}
                </p>

                <p>
                  <span className="font-semibold">
                    Referral Code:
                  </span>{" "}
                  {user.referralCode}
                </p>

                <p>
                  <span className="font-semibold">
                    Referrals:
                  </span>{" "}
                  {user.referralCount}
                </p>

                <p>
                  <span className="font-semibold">
                    Status:
                  </span>{" "}

                  <span
                    className={
                      user.suspended
                        ? "text-red-500 font-semibold"
                        : "text-green-600 font-semibold"
                    }
                  >
                    {user.suspended
                      ? "Suspended"
                      : "Active"}
                  </span>
                </p>

                <p>
                  <span className="font-semibold">
                    Joined:
                  </span>{" "}
                  {new Date(
                    user.createdAt
                  ).toLocaleString()}
                </p>

              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">

                <button className="blue-btn">
                  Credit Wallet
                </button>

                <button className="bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 font-semibold">
                  {user.suspended
                    ? "Unsuspend"
                    : "Suspend"}
                </button>

              </div>
            </div>
          ))}

          {users.length === 0 && (
            <div className="card text-center">
              No registered users.
            </div>
          )}
        </div>
      </main>
    </AdminGuard>
  );
}