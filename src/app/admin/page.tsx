import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";

export default function AdminDashboard() {
  const cards = [
    {
      title: "Users",
      href: "/admin/users",
    },
    {
      title: "Deposits",
      href: "/admin/deposits",
    },
    {
      title: "Withdrawals",
      href: "/admin/withdrawals",
    },
    {
      title: "Transactions",
      href: "/admin/transactions",
    },
    {
      title: "Tickets",
      href: "/admin/tickets",
  },
  ];

  return (
    <AdminGuard>
    <main className="page-padding">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="card text-center py-8"
          >
            <h2 className="font-semibold">
              {card.title}
            </h2>
          </Link>
        ))}
      </div>
    </main>
    </AdminGuard>
  );
}
