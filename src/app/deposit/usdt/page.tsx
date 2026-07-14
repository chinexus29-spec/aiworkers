 "use client";
import AuthGuard from "@/components/AuthGuard";



import { useState } from "react";
import BackButton from "@/components/BackButton";

const USD_RATE = 1350;

export default function UsdtDepositPage() {
  const [amount, setAmount] =
    useState("");

  const walletAddress =
    "TRNdq3wRXWJw9YUXqM2mBvvewoZ21SamEM";

  async function submitDeposit() {
    const savedUser =
      localStorage.getItem(
        "user"
      );

    if (!savedUser) {
      alert(
        "Please login first"
      );
      return;
    }

    const user =
      JSON.parse(savedUser);

    if (
      !amount ||
      Number(amount) <= 0
    ) {
      alert(
        "Enter a valid amount"
      );
      return;
    }

    const response =
      await fetch(
        "/api/deposit/usdt",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId: user.id,
            amount:
              Number(amount),
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      alert(
        data.message
      );
      return;
    }

    alert(
      "Deposit submitted. Awaiting Confirmation"
    );

    setAmount("");
  }

  function copyAddress() {
    navigator.clipboard.writeText(
      walletAddress
    );

    alert(
      "Wallet address copied"
    );
  }

  return (
    <AuthGuard>
    <main className="page-padding space-y-5">
      <BackButton />

      <h1 className="text-2xl font-bold">
        Deposit with USDT
      </h1>

      <div className="card">
        <label className="block text-sm text-gray-400 mb-2">
          Amount (USD)
        </label>
        <div className="flex items-center ml-6 mt-6">
      <div className="text-blue-500 px-2 py-3 font-bold">
        $
      </div>


        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          placeholder="Enter amount"
          className="w-full border rounded-xl p-3 bg-transparent text-right"
        />
        </div>

        
      </div>

      <div className="card">
        <h2 className="font-semibold mb-3">
          USDT Wallet Address
        </h2>

        <p className="text-sm text-gray-400 mb-2">
          Network: TRON(TRC20)
        </p>

        <p className="text-blue-500 break-all">
          {walletAddress}
        </p>

        <button
          onClick={
            copyAddress
          }
          className="blue-btn mt-4"
        >
          Copy Address
        </button>
      </div>

      <div className="card">
         <p className="text-sm text-gray-400 leading-6">
  Transfer <span className="font-semibold text-white">${amount}</span> via the{" "}
  <span className="font-semibold text-blue-500">
    Tron (TRC20)
  </span>{" "}
  network. After completing your payment, click the button below to submit your deposit for review.
        </p>

        <button
          onClick={
            submitDeposit
          }
          className="blue-btn mt-4 w-full"
        >
          I HAVE PAID
        </button>
      </div>

     

    </main>

    
    </AuthGuard>
  );
}
