 "use client";
import AuthGuard from "@/components/AuthGuard";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

export default function PaymentDetailsPage() {
  const [user, setUser] =
    useState<any>(null);

  const [
    walletAddress,
    setWalletAddress,
  ] = useState("");

  const [
    walletNetwork,
    setWalletNetwork,
  ] = useState("TRC20");

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
  console.error(
    "Failed to load user"
  );
  return;
}

const data =
  await response.json();
        if (data.user) {
          setUser(data.user);

          setWalletAddress(
            data.user.walletAddress || ""
          );

          setWalletNetwork(
            data.user.walletNetwork ||
              "TRC20"
          );

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

  async function saveDetails() {
    if (!user) return;

    if (!walletAddress.trim()) {
      alert(
        "Please enter your USDT wallet address"
      );
      return;
    }

    const response =
      await fetch(
        "/api/payment-details",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            walletAddress,
            walletNetwork,
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      alert(
        data.message ||
          "Failed to save wallet"
      );
      return;
    }

    const updatedUser = {
      ...user,
      walletAddress,
      walletNetwork,
    };

    setUser(updatedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert(
      "USDT wallet saved successfully"
    );
  }

  if (loading) {
    return (
      <AuthGuard>
    <main className="page-padding">
        Loading...
      </main>
    </AuthGuard>
    );
  }

  return (
    <AuthGuard>
    <main className="page-padding space-y-4">
      <BackButton />

      <h1 className="text-2xl font-bold">
        USDT Wallet
      </h1>

      <div className="card space-y-4">
        <div>
          <h2 className="font-semibold mb-2">
            Withdrawal Wallet
          </h2>

          <p className="text-sm text-gray-400">
            Withdrawals are currently
            supported only through
            USDT (TRC20).
          </p>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            USDT Wallet Address
          </label>

          <input
            placeholder="Enter your TRC20 wallet address"
            value={walletAddress}
            onChange={(e) =>
              setWalletAddress(
                e.target.value
              )
            }
            className="w-full bg-gray-900 rounded-lg p-3 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Network
          </label>

          <input
            value={walletNetwork}
            disabled
            className="w-full bg-gray-900 rounded-lg p-3 text-gray-400 cursor-not-allowed"
          />
        </div>
      </div>

      <button
        onClick={saveDetails}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 font-semibold transition"
      >
        Save Wallet
      </button>
    </main>
    </AuthGuard>
  );
}