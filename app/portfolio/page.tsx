"use client";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type PortfolioData = {
  userType: string;
  income: number;
  recurring: number;
  leisure: number;
  savings: number;
  emergency: number;
  investment: number;
  score: number;
};

export default function Portfolio() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [advice, setAdvice] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Load portfolio from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("portfolioData");
    if (!stored) return;
    setData(JSON.parse(stored));
  }, []);

  // Call backend API to get detailed insights
  useEffect(() => {
    if (!data) return;

    async function fetchAdvice() {
      try {
        setLoading(true);

        const res = await fetch("/api/advice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await res.json();

        if (result.advice) {
          setAdvice(result.advice);
        }
      } catch (error) {
        setAdvice(["Unable to generate financial insights at the moment."]);
      } finally {
        setLoading(false);
      }
    }

    fetchAdvice();
  }, [data]);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        No portfolio data found.
      </main>
    );
  }

  return (
    <main
      className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-12`}
    >
      <div className="max-w-6xl mx-auto space-y-10">

        <section className="text-center space-y-2">
          <h1 className="text-5xl font-bold">Financial Portfolio</h1>
          <p className="text-gray-300 text-lg">
            {data.userType === "student"
              ? "Student Financial Overview"
              : "Working Professional Overview"}
          </p>
        </section>

        <section className="bg-white/5 backdrop-blur p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl text-gray-300">Monthly Guru Score</h2>
          <div className="text-7xl font-bold mt-2">
            {data.score}/10
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Stat title="💰 Monthly Income / Allowance" value={`₹${data.income}`} />
          <Stat title="🔁 Recurring Costs" value={`₹${data.recurring}`} />
          <Stat title="🎉 Leisure Spending" value={`₹${data.leisure}`} />
          <Stat title="💾 Savings" value={`₹${data.savings}`} />
          <Stat title="🚨 Emergency Fund" value={`₹${data.emergency}`} />
          <Stat title="📈 Investments per Month" value={`₹${data.investment}`} />
        </section>

        {data.userType === "student" && (
          <button
            onClick={() => (window.location.href = "/borrow")}
            className="w-full bg-yellow-400 text-black py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            🤝 Borrow Money
          </button>
        )}

        {/* 🤖 Guru Advice */}
        <section className="bg-white/5 backdrop-blur p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">🤖 Guru Advice</h3>

          {loading && (
            <p className="text-gray-300">Generating personalized insights...</p>
          )}

          {!loading && advice.length > 0 && (
            <div className="space-y-4">
              {advice.map((item, index) => (
                <p key={index} className="text-gray-300 leading-relaxed">
                  • {item}
                </p>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white/5 backdrop-blur p-6 rounded-2xl shadow-lg">
      <h4 className="text-gray-400">{title}</h4>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </div>
  );
}

