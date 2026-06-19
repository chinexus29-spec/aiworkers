"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 mb-4 text-blue-500 font-medium"
    >
      <ArrowLeft size={20} />
      Back
    </button>
  );
}