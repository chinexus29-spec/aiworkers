 "use client";
import AuthGuard from "@/components/AuthGuard";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

const USD_RATE = 1350;

export default function WithdrawPage() {
const [user, setUser] =
useState<any>(null);

const [amount, setAmount] =
useState("");

const [error, setError] =
useState("");

const [loading, setLoading] =
useState(true);

useEffect(() => {
async function loadUser() {
try {
const savedUser =
localStorage.getItem("user");

 
    if (!savedUser) {
      setLoading(false);
      return;
    }

    const localUser =
      JSON.parse(savedUser);

    const response =
      await fetch(
        `/api/user/${localUser.id}`
      );

    if (!response.ok) {
      setUser(localUser);
      setLoading(false);
      return;
    }

    const data =
      await response.json();

    if (data.user) {
      setUser(data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );
    }

    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
}

loadUser();
 

}, []);

const hasWalletDetails =
user?.walletAddress &&
user?.walletNetwork;

const amountUsd =
Number(amount) || 0;

const feeUsd =
amountUsd * 0.05;

const receiveUsd =
amountUsd - feeUsd;

async function submit() {
if (!user) return;

 
if (!hasWalletDetails) {
  setError(
    "Please add your crypto wallet first"
  );
  return;
}

setError("");

const balanceUsd =
  (user.walletBalance || 0) /
  USD_RATE;

if (amountUsd < 5) {
  setError(
    "Minimum withdrawal is $5"
  );
  return;
}

if (amountUsd > balanceUsd) {
  setError(
    "Insufficient balance"
  );
  return;
}

const response =
  await fetch(
    "/api/withdraw",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        amount: amountUsd,
        method: "CRYPTO",
      }),
    }
  );

const data =
  await response.json();

if (!response.ok) {
  setError(
    data.message ||
      "Withdrawal failed"
  );
  return;
}

const updatedUser = {
  ...user,
  walletBalance:
    user.walletBalance -
    amountUsd * USD_RATE,
};

setUser(updatedUser);

localStorage.setItem(
  "user",
  JSON.stringify(updatedUser)
);

alert(
  "Withdrawal request submitted"
);

setAmount("");
 

}

if (loading) {
return ( <AuthGuard>
    <main className="page-padding">
Loading... </main>
    </AuthGuard>
);
}

return ( 

<AuthGuard>
<main className="page-padding space-y-5"> <BackButton />

 
  <h1 className="text-2xl font-bold">
    Withdraw
  </h1>

  <div className="card">
    <p className="text-gray-400">
      Available Balance
    </p>

    <p className="text-3xl font-bold text-blue-500">
      $
      {(
        (user?.walletBalance || 0) /
        USD_RATE
      ).toFixed(2)}
    </p>

    <p className="text-gray-500">
      ₦
      {(
        user?.walletBalance || 0
      ).toLocaleString()}
    </p>
  </div>

  <div className="card">
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-semibold">
        Crypto Wallet
      </h2>

      <a
        href="/payment-details"
        className="text-blue-500 text-sm font-medium"
      >
        Edit
      </a>
    </div>

    <p className="break-all">
      {user?.walletAddress ||
        "No wallet saved"}
    </p>

    <p>
      {user?.walletNetwork ||
        ""}
    </p>
  </div>

  <div className="card">
    <div className="flex justify-between items-center mb-2">
      <label className="font-medium">
        Amount
      </label>

      <span className="text-sm text-blue-500">
        Balance: $
        {(
          (user?.walletBalance || 0) /
          USD_RATE
        ).toFixed(2)}
      </span>
    </div>

    <div className="flex items-center ml-6 mt-6">
      <div className="text-blue-500 px-2 py-3 font-bold">
        $
      </div>

      <input
        type="text"
        inputMode="decimal"
        value={amount}
        onChange={(e) => {
          setAmount(
            e.target.value
          );
          setError("");
        }}
        className="flex-1 bg-gray-900 p-2 text-white text-right rounded-lg"
        placeholder="Minimum withdrawal: $5"
      />
    </div>

    {error && (
      <p className="text-red-500 text-sm mt-2">
        {error}
      </p>
    )}

    <div className="mt-4 space-y-2">

  <div className="flex justify-between items-center">
    <span className="font-medium">
      You Receive
    </span>

    <span className="text-xl font-bold text-blue-500">
      ${receiveUsd.toFixed(2)}
    </span>
  </div>

  <div className="flex justify-between items-center text-sm text-gray-400">
    <span>
      Withdrawal Fee (5%)
    </span>

    <span>
      -${feeUsd.toFixed(2)}
    </span>
  </div>
</div>
</div>

  <button
    onClick={submit}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 font-semibold transition"
  >
    Submit Withdrawal
  </button>

  <div className="card bg-gray-900 border-gray-800 opacity-80">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-semibold">
          Naira Withdrawal
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          Direct bank withdrawals
          will be available soon.
        </p>
      </div>

      <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-sm">
        Coming Soon
      </span>
    </div>
  </div>
</main>
  </AuthGuard>
 

);
}