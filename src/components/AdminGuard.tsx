"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

const ADMIN_PHONES = [
  "11111111111",
  "destiny",
];

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user");

    if (!savedUser) {
      router.replace("/login");
      return;
    }

    const user =
      JSON.parse(savedUser);

    const phone =
      String(
        user.phoneNumber || ""
      );

    if (
      !ADMIN_PHONES.includes(
        phone
      )
    ) {
      router.replace("/");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}