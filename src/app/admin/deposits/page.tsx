"use client";
import AdminGuard from "@/components/AdminGuard";

import {
  useEffect,
  useState,
} from "react";


const USD_RATE = 1350;

export default function AdminDepositsPage() {
  const [
    deposits,
    setDeposits,
  ] = useState<any[]>([]);

  async function loadDeposits() {
    try {
      const response =
        await fetch(
          "/api/admin/deposits"
        );

      const data =
        await response.json();

      setDeposits(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function approveDeposit(
    depositId: string
  ) {
    const response =
      await fetch(
        "/api/admin/deposit/approve",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            depositId,
          }),
        }
      );

    const data =
      await response.json();

    alert(
      data.message ||
        "Deposit approved"
    );

    loadDeposits();
  }

  useEffect(() => {
    loadDeposits();
  }, []);

  return (
    <AdminGuard>
    <main className="page-padding">
      <h1 className="text-2xl font-bold mb-6">
        Deposit Requests
      </h1>

      <div className="space-y-4">
        {deposits.map(
          (deposit) => (
            <div
              key={deposit.id}
              className="card"
            >
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">
                    User
                  </p>

                  <p className="font-bold">
                    {
                      deposit.user
                        ?.fullName
                    }
                  </p>
                </div>

                <div>
  <p className="text-gray-400 text-sm">
    Deposit Time
  </p>

  <p className="font-medium">
    {new Date(
      deposit.createdAt
    ).toLocaleString()}
  </p>
</div>
                
                <div>
                  <p className="text-gray-400 text-sm">
                    Deposit Amount
                  </p>

                  <p className="font-bold text-green-500">
                    $
                    {(
                      (deposit.amount ||
                        0) 
                    ).toFixed(2)}
                  </p>

                  
                </div>

                <div>
                  <p className="text-gray-400 text-sm">
                    Status
                  </p>

                  <p className="font-semibold text-yellow-500">
                    {deposit.status}
                  </p>
                </div>
              </div>

              {deposit.status ===
                "PENDING" && (
                <button
                  onClick={() =>
                    approveDeposit(
                      deposit.id
                    )
                  }
                  className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                >
                  Approve Deposit
                </button>
              )}
            </div>
          )
        )}

        {deposits.length ===
          0 && (
          <div className="card text-center">
            No deposit requests
          </div>
        )}
      </div>
    </main>
    </AdminGuard>
  );
}