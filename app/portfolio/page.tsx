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
  const [advice, setAdvice] = useState("");

  // 1️⃣ Load portfolio from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("portfolioData");
    if (!stored) return;
    setData(JSON.parse(stored));
  }, []);

  // 2️⃣ Generate AI-style advice (client-side)
  useEffect(() => {
    if (!data) return;

    const tips: string[] = [];

    if (data.savings < data.income * 0.2) {
      tips.push("Try increasing your savings to at least 20% of your income.");
    }

    if (data.leisure > data.income * 0.3) {
      tips.push("Your leisure spending is high. Consider setting a monthly cap.");
    }

    if (data.investment === 0) {
      tips.push("Starting a small monthly investment can significantly improve long-term wealth.");
    }

    if (data.emergency < data.income * 3) {
      tips.push("Build an emergency fund covering at least 3 months of income.");
    }

    if (tips.length === 0) {
      tips.push("Excellent financial discipline. Maintain your current habits.");
    }

    setAdvice(tips.join(" "));
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

        {/* Header */}
        <section className="text-center space-y-2">
          <h1 className="text-5xl font-bold">Financial Portfolio</h1>
          <p className="text-gray-300 text-lg">
            {data.userType === "student"
              ? "Student Financial Overview"
              : "Working Professional Overview"}
          </p>
        </section>

        {/* Score */}
        <section className="bg-white/5 backdrop-blur p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl text-gray-300">Monthly Guru Score</h2>
          <div className="text-7xl font-bold mt-2">
            {data.score}/10
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Stat title="💰 Monthly Income / Allowance" value={`₹${data.income}`} />
          <Stat title="🔁 Recurring Costs" value={`₹${data.recurring}`} />
          <Stat title="🎉 Leisure Spending" value={`₹${data.leisure}`} />
          <Stat title="💾 Savings" value={`₹${data.savings}`} />
          <Stat title="🚨 Emergency Fund" value={`₹${data.emergency}`} />
          <Stat title="📈 Investments per Month" value={`₹${data.investment}`} />
        </section>

        {/* 🤖 Guru Advice */}
        <section className="bg-white/5 backdrop-blur p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-2">🤖 Guru Advice</h3>
          <p className="text-gray-300 leading-relaxed">
            {advice}
          </p>
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