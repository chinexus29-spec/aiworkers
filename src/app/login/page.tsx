"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

async function handleLogin() {
  if (
  phone !== "destiny" &&
  !/^\d{11}$/.test(phone)
) {
  alert(
    "Phone number must be exactly 11 digits"
  );
  return;
}
  const response =
    await fetch("/api/login", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        phoneNumber: phone,
        pin,
      }),
    });

  const data =
    await response.json();

  if (!response.ok) {
    alert(data.message);
    return;
  }

  localStorage.setItem(
    "user",
    JSON.stringify(data)
  );

  router.push("/");
}

  return (
    <main className="page-padding">
      <div className="card space-y-4">
        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) =>
            setPin(e.target.value)
          }
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={handleLogin}
          className="cyan-btn w-full"
        >
          Login
        </button>

        <div className="text-center">
  <p className="text-sm text-gray-600">
    Don't have an account?
  </p>

  <Link
    href="/register"
    className="text-blue-500 font-semibold"
  >
    Create Account
  </Link>
</div>
      </div>
    </main>
  );
}