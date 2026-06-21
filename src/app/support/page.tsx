"use client";

import AuthGuard from "@/components/AuthGuard";

export default function SupportPage() {
const whatsappNumber =
"2348012345678"; // Replace with your real number

const message =
encodeURIComponent(
"Hello AI Workers Support, I need assistance."
);

return ( <AuthGuard> <main className="page-padding space-y-5">


    <h1 className="text-2xl font-bold">
      Customer Service
    </h1>

    {/* Support Hours */}

    <div className="card">
      <h2 className="font-bold text-lg mb-2">
        Working Hours
      </h2>

      <p className="text-gray-300">
        Monday - Sunday
      </p>

      <p className="text-gray-300">
        8:00 AM - 8:00 PM
      </p>
    </div>

    {/* WhatsApp */}

    <div className="card">
      <h2 className="font-bold text-lg mb-3">
        WhatsApp Support
      </h2>

      <p className="text-gray-300 mb-4">
        Contact our customer service team
        for account, deposit and withdrawal
        assistance.
      </p>

      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        className= "w-full py-3 rounded-xl font-semibold transition bg-blue-600 hover:bg-blue-700 text-white"
      >
        Contact Customer Service
      </a>
    </div>

    {/* Help Cards */}

    <div className="card">
      <h2 className="font-bold text-lg mb-4">
        Help Center
      </h2>

      <div className="space-y-4">

        <div className="bg-slate-800 rounded-xl p-4">
          <h3 className="font-semibold">
            Deposit Issues
          </h3>

          <p className="text-sm text-gray-400 mt-2">
            Having trouble making a
            deposit? Contact support.
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <h3 className="font-semibold">
            Withdrawal Issues
          </h3>

          <p className="text-sm text-gray-400 mt-2">
            Withdrawal delayed? Contact
            customer service.
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <h3 className="font-semibold">
            Account Issues
          </h3>

          <p className="text-sm text-gray-400 mt-2">
            Can't login or access your
            account? We're here to help.
          </p>
        </div>

      </div>
    </div>

    {/* FAQ */}

    <div className="card">
      <h2 className="font-bold text-lg mb-4">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">

        <div>
          <p className="font-semibold">
            When do I start earning?
          </p>

          <p className="text-sm text-gray-400">
            Earnings begin 24 hours after
            purchasing a worker bot.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            How long do deposits take?
          </p>

          <p className="text-sm text-gray-400">
            Deposits are usually processed
            within a few minutes after
            approval.
          </p>
        </div>

        <div>
          <p className="font-semibold">
            Can I purchase a bot twice?
          </p>

          <p className="text-sm text-gray-400">
            No. Each worker bot can only be
            purchased once per account.
          </p>
        </div>

      </div>
    </div>

  </main>
</AuthGuard>


);
}
