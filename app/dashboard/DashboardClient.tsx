"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const userType = searchParams.get("userType") || "student";

  const [income, setIncome] = useState<number | "">("");
  const [recurring, setRecurring] = useState<number | "">("");
  const [leisure, setLeisure] = useState<number | "">("");
  const [savings, setSavings] = useState<number | "">("");
  const [emergency, setEmergency] = useState<number | "">("");
  const [investment, setInvestment] = useState<number | "">("");
  const [score, setScore] = useState(0);

  function computeScore() {
    let points = 0;
    const i = Number(income) || 0;
    const r = Number(recurring) || 0;
    const l = Number(leisure) || 0;
    const s = Number(savings) || 0;
    const e = Number(emergency) || 0;
    const inv = Number(investment) || 0;

    if (r <= i * 0.5) points += 2;
    else points += 1;

    if (l <= i * 0.3) points += 2;
    else points += 1;

    if (s > 0) points += 2;
    if (e > 0) points += 2;
    if (inv > 0) points += 2;

    return Math.min(points, 10);
  }

  function goToPortfolio() {
    const finalScore = computeScore();
    setScore(finalScore);

    const portfolio = {
      userType,
      income: Number(income) || 0,
      recurring: Number(recurring) || 0,
      leisure: Number(leisure) || 0,
      savings: Number(savings) || 0,
      emergency: Number(emergency) || 0,
      investment: Number(investment) || 0,
      score: finalScore,
    };

    localStorage.setItem("portfolioData", JSON.stringify(portfolio));
    window.location.href = "/portfolio";
  }

  const num =
    (setter: (v: number | "") => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value === "" ? "" : Number(e.target.value));

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">
        {userType === "student"
          ? "🎓 Student Dashboard"
          : "👔 Working Adult Dashboard"}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur p-6 rounded-2xl shadow-lg space-y-4 relative">
          <h2 className="font-bold">Enter Details</h2>

          <input type="number" value={income} placeholder="Monthly Income"
            className="w-full bg-black/40 p-3 rounded-xl"
            onChange={num(setIncome)} />

          <input type="number" value={recurring} placeholder="Recurring Costs"
            className="w-full bg-black/40 p-3 rounded-xl"
            onChange={num(setRecurring)} />

          <input type="number" value={leisure} placeholder="Leisure Spending"
            className="w-full bg-black/40 p-3 rounded-xl"
            onChange={num(setLeisure)} />

          <input type="number" value={savings} placeholder="Savings"
            className="w-full bg-black/40 p-3 rounded-xl"
            onChange={num(setSavings)} />

          <input type="number" value={emergency} placeholder="Emergency Fund"
            className="w-full bg-black/40 p-3 rounded-xl"
            onChange={num(setEmergency)} />

          <input type="number" value={investment} placeholder="Investments / month"
            className="w-full bg-black/40 p-3 rounded-xl"
            onChange={num(setInvestment)} />

          <button
            onClick={goToPortfolio}
            className="w-full bg-blue-500 text-black py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            View Portfolio →
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("moneyguruUser");
              window.location.href = "/";
            }}
            className="absolute top-6 right-6 text-sm text-gray-400 hover:text-white"
          >
            Logout
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur p-6 rounded-2xl shadow-lg text-center space-y-4">
          <h2 className="font-bold">Monthly Guru Score</h2>
          <div className="text-6xl font-bold">{score}/10</div>
        </div>
      </div>
    </main>
  );
}

