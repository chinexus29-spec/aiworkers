import BackButton from "@/components/BackButton";
import AuthGuard from "@/components/AuthGuard";

import {
  MessageCircle,
} from "lucide-react";

export default function SupportPage() {
  return (
    <AuthGuard>
    <main className="page-padding space-y-4">
      <BackButton />
      <h1 className="text-2xl font-bold">
        Customer Service
      </h1>

      <div className="card">
        <p>
          WhatsApp:
          +234XXXXXXXXXX
        </p>

        <button className="cyan-btn w-full mt-4 flex items-center justify-center gap-2">
          <MessageCircle size={18} />
          Contact Support
        </button>
      </div>
    </main>
    </AuthGuard>
  );
}