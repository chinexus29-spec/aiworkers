type BalanceCardProps = {
  balance: number;
  earnings: number;
};

const USD_RATE = 1350;

export default function BalanceCard({
  balance,
  earnings,
}: BalanceCardProps) {
  const usdBalance =
    balance / USD_RATE;

  const usdEarnings =
    earnings / USD_RATE;

  return (
    <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-2xl p-5">
      <p className="text-sm opacity-90">
        Wallet Balance
      </p>

      <h2 className="text-3xl font-bold mt-2">
        ${usdBalance.toFixed(2)}
      </h2>

      

      <div className="mt-4 border-t border-blue-400 pt-4">
        <p className="text-sm opacity-90">
          Total Earnings
        </p>

        <p className="text-xl font-semibold">
          ${usdEarnings.toFixed(2)}
        </p>

        
      </div>
    </div>
  );
}