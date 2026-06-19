"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const user =
      localStorage.getItem("user");

    if (!user) {
      router.replace("/login");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <main className="page-padding">
        Loading...
      </main>
    );
  }

  return <>{children}</>;
}