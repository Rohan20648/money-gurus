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
    const i = Number(income) || 0;
    const r = Number(recurring) || 0;
    const l = Number(leisure) || 0;
    const s = Number(savings) || 0;
    const e = Number(emergency) || 0;
    const inv = Number(investment) || 0;

    let total = 0;

    if (i > 0 && s / i >= 0.2) total += 3;
    if (r > 0 && e / r >= 3) total += 2;
    if (i > 0 && l / i <= 0.25) total += 2;
    if (i > 0 && inv / i >= 0.1) total += 2;
    if (i >= r + l + inv) total += 1;

    return Math.min(total, 10);
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 md:px-8 py-6 md:py-12">
      <div className="max-w-6xl mx-auto">

        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            {userType === "student"
              ? "Student Finance Hub"
              : "Personal Finance Hub"}
          </h1>
        </header>

        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-10">

          <section className="lg:col-span-3 space-y-6">
            <h2 className="text-2xl font-semibold">Monthly Snapshot</h2>

            <button
              onClick={goToPortfolio}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full font-semibold"
            >
              Generate Smart Report →
            </button>
          </section>

          <section className="lg:col-span-2 flex items-center justify-center">
            <div className="text-6xl md:text-9xl font-extrabold">
              {score}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}


