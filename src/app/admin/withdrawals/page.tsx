"use client";

import {
  useEffect,
  useState,
} from "react";
import AdminGuard from "@/components/AdminGuard";

const USD_RATE = 1350;

export default function AdminWithdrawalsPage() {
  const [
    withdrawals,
    setWithdrawals,
  ] = useState<any[]>([]);

  async function loadWithdrawals() {
    try {
      const response =
        await fetch(
          "/api/admin/withdrawals"
        );

      const data =
        await response.json();

      setWithdrawals(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadWithdrawals();
  }, []);

  async function approve(
    withdrawalId: string
  ) {
    const response =
      await fetch(
        "/api/admin/withdrawals/approve",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            withdrawalId,
          }),
        }
      );

    if (response.ok) {
      loadWithdrawals();
    }
  }

  return (
    <AdminGuard>
    <main className="page-padding">
      <h1 className="text-2xl font-bold mb-6">
        Withdrawal Requests
      </h1>

      <div className="space-y-4">
        {withdrawals.map(
          (withdrawal) => (
            <div
              key={withdrawal.id}
              className="card"
            >
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">
                    User
                  </p>

                  <p className="font-bold">
                    {
                      withdrawal.user
                        ?.fullName
                    }
                  </p>
                </div>

                <div>
  <div className="flex items-center justify-between mb-1">
    <p className="text-gray-400 text-sm">
      Wallet Address
    </p>

    <button
      onClick={() => {
        navigator.clipboard.writeText(
          withdrawal.user?.walletAddress || ""
        );

        alert(
          "Wallet address copied"
        );
      }}
      className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
    >
      Copy
    </button>
  </div>

  <p className="break-all text-sm">
    {
      withdrawal.user
        ?.walletAddress
    }
  </p>
</div>
                <div>
                  <p className="text-gray-400 text-sm">
                    Amount To Send
                  </p>

                  <p className="font-bold text-green-500">
                    $
                    {(
                      (withdrawal.amountToReceive ||
                        withdrawal.receiveAmount ||
                        0) /
                      USD_RATE
                    ).toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    User Current Balance
                  </p>

                  <p className="font-bold text-blue-500">
                    $
                    {(
                      (withdrawal.user
                        ?.walletBalance ||
                        0) /
                      USD_RATE
                    ).toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Status
                  </p>

                  <p className="font-semibold text-yellow-500">
                    {withdrawal.status}
                  </p>
                </div>
              </div>

              {withdrawal.status ===
                "PENDING" && (
                <button
                  onClick={() =>
                    approve(
                      withdrawal.id
                    )
                  }
                  className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                >
                  Approve Withdrawal
                </button>
              )}
            </div>
          )
        )}

        {withdrawals.length ===
          0 && (
          <div className="card text-center">
            No withdrawal requests
          </div>
        )}
      </div>
    </main>
    </AdminGuard>
  );
}