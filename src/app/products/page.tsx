"use client";

import AuthGuard from "@/components/AuthGuard";
import { useEffect, useState } from "react";


const products = [
{
id: 1,
name: "AI Content Creation",
image: "/products/content.jpg",
price: "$10",
income: "$0.70",
duration: "30 Days",
description:
"AI Content Creation generates articles, social media posts, marketing copy and digital content using advanced artificial intelligence systems.",
},

{
id: 2,
name: "AI Chatbots",
image: "/products/chatbot.jpg",
price: "$23",
income: "$2",
duration: "30 Days",
description:
"AI Chatbots provide automated customer support and intelligent communication to improve customer engagement and business efficiency.",
},

{
id: 3,
name: "AI-Powered Education & Tutoring",
image: "/products/education.jpg",
price: "$41",
income: "$3.80",
duration: "30 Days",
description:
"AI tutoring systems personalize learning experiences, provide intelligent assistance and help students achieve better educational outcomes.",
},

{
id: 4,
name: "AI Marketing Automation",
image: "/products/marketing.jpg",
price: "$90",
income: "$10",
duration: "30 Days",
description:
"AI Marketing Automation analyzes customer behavior, optimizes campaigns and automates digital marketing workflows.",
},

{
id: 5,
name: "AI Cybersecurity Solutions",
image: "/products/cybersecurity.jpg",
price: "$160",
income: "$18.5",
duration: "30 Days",
description:
"AI Cybersecurity Solutions detect threats, monitor suspicious activities and strengthen digital security infrastructures.",
},

{
id: 6,
name: "AI Robotics & Industrial Automation",
image: "/products/robotics.jpg",
price: "$340",
income: "$40",
duration: "30 Days",
description:
"AI Robotics and Industrial Automation improve manufacturing efficiency through intelligent machines and automated processes.",
},
];

export default function ProductsPage() {
const [selectedProduct, setSelectedProduct] =
useState<any>(null);

const [purchasedPlans, setPurchasedPlans] =
useState<string[]>([]);

const [workerBots, setWorkerBots] =
useState(0);


useEffect(() => {
async function loadPlans() {
const user = JSON.parse(
localStorage.getItem("user") || "{}"
);


  if (!user.id) return;

  const response = await fetch(
    `/api/user/plans?userId=${user.id}`
  );

  const data = await response.json();

  setPurchasedPlans(
    data.map(
      (plan: any) => plan.planName
    )
  );

  setWorkerBots(data.length);

}

loadPlans();


}, []);

return ( <AuthGuard> <main className="page-padding space-y-5"> <h1 className="text-2xl font-bold">
AI Investment Products </h1>

<div className="bg-[#111827] border border-slate-800 rounded-2xl p-4">
  <p className="text-lg font-semibold text-white">
    Worker Bots: {workerBots}
  </p>
</div>


    {products.map((product) => (
      <div
        key={product.id}
        className="overflow-hidden rounded-2xl bg-[#111827] border border-slate-800"
      >
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

          <p className="text-sm text-gray-400 leading-6 mb-5">
            {product.description}
          </p>

          <button
            disabled={purchasedPlans.includes(
              product.name
            )}
            onClick={() =>
              setSelectedProduct(product)
            }
            className={`w-full py-3 rounded-xl font-semibold transition ${
              purchasedPlans.includes(
                product.name
              )
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {purchasedPlans.includes(
              product.name
            )
              ? "Already Purchased"
              : "Purchase Plan"}
          </button>
        </div>
      </div>
    ))}

    {selectedProduct && (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white border border-slate-700 rounded-2xl p-6 w-[90%] max-w-lg">

          <h2 className="text-xl font-bold mb-4">
            Confirm Purchase
          </h2>

          <p className="mb-2">
            Do you want to purchase:
          </p>

          <p className="text-blue-500 font-bold text-lg mb-5">
            {selectedProduct.name}
          </p>

          <div className="space-y-2 mb-6">
            <p>
              <strong>Price:</strong>{" "}
              {selectedProduct.price}
            </p>

            <p>
              <strong>Daily Income:</strong>{" "}
              {selectedProduct.income}
            </p>

            <p>
              <strong>Duration:</strong>{" "}
              {selectedProduct.duration}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() =>
                setSelectedProduct(null)
              }
              className="flex-1 bg-gray-600 text-blue-500 font-semibold py-3 rounded-xl"
            >
              Cancel
            </button>

            <button
              onClick={async () => {
                const user = JSON.parse(
                  localStorage.getItem(
                    "user"
                  ) || "{}"
                );

                const response =
                  await fetch(
                    "/api/products/purchase",
                    {
                      method: "POST",

                      headers: {
                        "Content-Type":
                          "application/json",
                      },

                      body: JSON.stringify({
                        userId: user.id,
                        planId:
                          selectedProduct.id,
                      }),
                    }
                  );

                const data =
                  await response.json();

                alert(data.message);

                if (response.ok) {
                  setPurchasedPlans([
                    ...purchasedPlans,
                    selectedProduct.name,
                  ]);
                }

                setSelectedProduct(null);
              }}
              className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-xl"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )}
  </main>
</AuthGuard>


);
}
