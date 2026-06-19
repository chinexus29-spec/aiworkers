"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
const router = useRouter();

const [fullName, setFullName] =
useState("");

const [phoneNumber, setPhoneNumber] =
useState("");

const [referralCode, setReferralCode] =
useState("");

const [pin, setPin] =
useState("");

const [loading, setLoading] =
useState(false);

useEffect(() => {
const params =
new URLSearchParams(
window.location.search
);


const ref =
  params.get("ref");

if (ref) {
  setReferralCode(ref);
}

}, []);

async function handleRegister() {
if (!/^\d{11}$/.test(phoneNumber)) {
alert(
"Phone number must be exactly 11 digits"
);
return;
}

try {
  setLoading(true);

  const response =
    await fetch("/api/register", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        fullName,
        phoneNumber,
        pin,
        referralCode,
      }),
    });

  const data =
    await response.json();

  if (!response.ok) {
    alert(data.message);
    return;
  }

  alert(
    "Registration successful"
  );

  router.push("/login");
} catch (error) {
  console.error(error);

  alert(
    "Something went wrong"
  );
} finally {
  setLoading(false);
}


}

return ( <main className="page-padding min-h-screen flex items-center"> <div className="card w-full space-y-4"> <h1 className="text-2xl font-bold text-center">
Create Account </h1>

    <input
      type="text"
      placeholder="Full Name"
      value={fullName}
      onChange={(e) =>
        setFullName(
          e.target.value
        )
      }
      className="w-full border rounded-xl p-3"
    />

    <input
      type="tel"
      placeholder="Phone Number"
      value={phoneNumber}
      onChange={(e) => {
        const value =
          e.target.value
            .replace(/\D/g, "")
            .slice(0, 11);

        setPhoneNumber(value);
      }}
      className="w-full border rounded-xl p-3"
    />

    <input
      type="text"
      placeholder="Referral Code (Optional)"
      value={referralCode}
      onChange={(e) =>
        setReferralCode(
          e.target.value.toUpperCase()
        )
      }
      className="w-full border rounded-xl p-3"
    />

    <input
      type="password"
      placeholder="PIN"
      value={pin}
      onChange={(e) =>
        setPin(
          e.target.value
        )
      }
      className="w-full border rounded-xl p-3"
    />

    <button
      onClick={handleRegister}
      disabled={loading}
      className="cyan-btn w-full"
    >
      {loading
        ? "Creating Account..."
        : "Register"}
    </button>

    <div className="text-center">
      <p className="text-sm text-gray-600">
        Already have an account?
      </p>

      <Link
        href="/login"
        className="text-blue-500 font-semibold"
      >
        Login Here
      </Link>
    </div>
  </div>
</main>
);
}