 "use client";
import AuthGuard from "@/components/AuthGuard";

import {
  useEffect,
  useState,
} from "react";

import BackButton from "@/components/BackButton";

export default function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<any[]>([]);

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user");

    if (!savedUser) return;

    const user =
      JSON.parse(savedUser);

    fetch(
      "/api/transactions",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          userId: user.id,
        }),
      }
    )
      .then((res) =>
        res.json()
      )
      .then((data) =>
        setTransactions(data)
      );
  }, []);

  return (
    <AuthGuard>
    <main className="page-padding">
      <BackButton />

      <h1 className="text-2xl font-bold mb-5">
        Transactions
      </h1>

      <div className="space-y-3">
        {transactions.map(
          (transaction) => (
            <div
              key={transaction.id}
              className="card"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">
                    {
                      transaction.type
                    }
                  </p>

                  <p className="text-sm text-gray-400">
                    {
                      transaction.description
                    }
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-blue-500 font-bold">
                    ₦
                    {transaction.amount.toLocaleString()}
                  </p>

                  <p className="text-sm text-gray-400">
                    {
                      transaction.status
                    }
                  </p>
                </div>
              </div>
            </div>
          )
        )}

        {transactions.length ===
          0 && (
          <div className="card">
            No transactions yet
          </div>
        )}
      </div>
    </main>
    </AuthGuard>
  );
}