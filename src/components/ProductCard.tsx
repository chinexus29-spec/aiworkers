type ProductCardProps = {
  name: string;
  price: number;
  dailyIncome: number;
  totalIncome: number;
  duration: number;
};

export default function ProductCard({
  name,
  price,
  dailyIncome,
  totalIncome,
  duration,
}: ProductCardProps) {
  return (
    <div className="card">
      <h2 className="text-xl font-bold text-blue-500">
        {name}
      </h2>

      <div className="mt-4 space-y-2 text-sm">
        <p>
          Price:
          <strong>
            {" "}
            ₦{price.toLocaleString()}
          </strong>
        </p>

        <p>
          Daily Income:
          <strong>
            {" "}
            ₦
            {dailyIncome.toLocaleString()}
          </strong>
        </p>

        <p>
          Total Income:
          <strong>
            {" "}
            ₦
            {totalIncome.toLocaleString()}
          </strong>
        </p>

        <p>
          Duration:
          <strong>
            {" "}
            {duration} Days
          </strong>
        </p>
      </div>

      <button className="cyan-btn w-full mt-4">
        Purchase
      </button>
    </div>
  );
}