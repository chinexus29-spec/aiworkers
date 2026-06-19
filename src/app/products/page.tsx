 "use client";
import AuthGuard from "@/components/AuthGuard";

const products = [
  {
    id: 1,
    name: "AI Content Creation",
    image: "/products/content.jpg",
    price: "$3",
    income: "$0.30",
    duration: "30 Days",
    description:
      "AI Content Creation generates articles, social media posts, marketing copy and digital content using advanced artificial intelligence systems.",
  },

  {
    id: 2,
    name: "AI Chatbots",
    image: "/products/chatbot.jpg",
    price: "$10",
    income: "$1.20",
    duration: "30 Days",
    description:
      "AI Chatbots provide automated customer support and intelligent communication to improve customer engagement and business efficiency.",
  },

  {
    id: 3,
    name: "AI-Powered Education & Tutoring",
    image: "/products/education.jpg",
    price: "$30",
    income: "$3.80",
    duration: "30 Days",
    description:
      "AI tutoring systems personalize learning experiences, provide intelligent assistance and help students achieve better educational outcomes.",
  },

  {
    id: 4,
    name: "AI Marketing Automation",
    image: "/products/marketing.jpg",
    price: "$100",
    income: "$13",
    duration: "30 Days",
    description:
      "AI Marketing Automation analyzes customer behavior, optimizes campaigns and automates digital marketing workflows.",
  },

  {
    id: 5,
    name: "AI Cybersecurity Solutions",
    image: "/products/cybersecurity.jpg",
    price: "$300",
    income: "$42",
    duration: "30 Days",
    description:
      "AI Cybersecurity Solutions detect threats, monitor suspicious activities and strengthen digital security infrastructures.",
  },

  {
    id: 6,
    name: "AI Robotics & Industrial Automation",
    image: "/products/robotics.jpg",
    price: "$1000",
    income: "$150",
    duration: "30 Days",
    description:
      "AI Robotics and Industrial Automation improve manufacturing efficiency through intelligent machines and automated processes.",
  },
];

export default function ProductsPage() {
  return (
    <AuthGuard>
    <main className="page-padding space-y-5">
      <h1 className="text-2xl font-bold">
        AI Investment Products
      </h1>

      {products.map((product) => (
        <div
          key={product.id}
          className="overflow-hidden rounded-2xl bg-[#111827] border border-slate-800"
        >
          {/* Banner */}

          <div
            className="h-44 bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${product.image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/55 flex items-end">
              <h2 className="text-white text-xl font-bold p-4">
                {product.name}
              </h2>
            </div>
          </div>

          {/* Details */}

          <div className="p-4">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <p className="text-gray-400 text-sm">
                  Price
                </p>

                <p className="text-blue-500 font-bold">
                  {product.price}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  Daily Income
                </p>

                <p className="text-green-500 font-bold">
                  {product.income}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  Duration
                </p>

                <p className="text-white font-bold">
                  {product.duration}
                </p>
              </div>
            </div>

            {/* Description */}

            <p className="text-sm text-gray-400 leading-6 mb-5">
              {product.description}
            </p>

            {/* Purchase */}

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition">
              Purchase Plan
            </button>
          </div>
        </div>
      ))}
    </main>
    </AuthGuard>
  );
}