export default function AdminUsersPage() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      balance: 50000,
      referrals: 4,
    },
    {
      id: 2,
      name: "Jane Smith",
      balance: 25000,
      referrals: 2,
    },
  ];

  return (
    <main className="page-padding">
      <h1 className="text-2xl font-bold mb-5">
        Users
      </h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="card"
          >
            <h2 className="font-bold">
              {user.name}
            </h2>

            <p>
              Balance:
              ₦{user.balance.toLocaleString()}
            </p>

            <p>
              Referrals:
              {user.referrals}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className="blue-btn">
                Credit
              </button>

              <button className="bg-red-500 text-white rounded-xl p-3">
                Suspend
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}