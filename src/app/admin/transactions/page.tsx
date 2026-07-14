
export default function AdminTransactionsPage() {
  const transactions = [
    {
      id: 1,
      type: "Deposit",
      amount: 10000,
      status: "Approved",
    },
    {
      id: 2,
      type: "Withdrawal",
      amount: 5000,
      status: "Pending",
    },
  ];

  return (
    <main className="page-padding">
      <h1 className="text-2xl font-bold mb-5">
        Transactions
      </h1>

      <div className="space-y-4">
        {transactions.map(
          (transaction) => (
            <div
              key={transaction.id}
              className="card"
            >
              <h2 className="font-bold">
                {transaction.type}
              </h2>

              <p>
                Amount:
                $
                {transaction.amount}.toLocaleString()
              </p>

              <p>
                Status:
                {transaction.status}
              </p>
            </div>
          )
        )}
      </div>
    </main>
  );
}