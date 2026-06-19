"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("user");

    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 font-semibold"
    >
      Logout
    </button>
  );
}