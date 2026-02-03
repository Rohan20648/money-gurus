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

    let savingsScore = 0;
    let emergencyScore = 0;
    let leisureScore = 0;
    let investmentScore = 0;
    let balanceScore = 0;

    const savingsRate = i > 0 ? s / i : 0;
    const emergencyMonths = r > 0 ? e / r : 0;
    const leisureRate = i > 0 ? l / i : 0;
    const investmentRate = i > 0 ? inv / i : 0;

    if (savingsRate >= 0.25) savingsScore = 3;
    else if (savingsRate >= 0.20) savingsScore = 2.5;
    else if (savingsRate >= 0.15) savingsScore = 2;
    else if (savingsRate >= 0.10) savingsScore = 1.5;
    else if (savingsRate > 0) savingsScore = 1;

    if (emergencyMonths >= 6) emergencyScore = 2;
    else if (emergencyMonths >= 3) emergencyScore = 1.5;
    else if (emergencyMonths >= 1) emergencyScore = 1;

    if (leisureRate <= 0.15) leisureScore = 2;
    else if (leisureRate <= 0.25) leisureScore = 1.5;
    else if (leisureRate <= 0.35) leisureScore = 1;

    if (investmentRate >= 0.20) investmentScore = 2;
    else if (investmentRate >= 0.10) investmentScore = 1.5;
    else if (investmentRate > 0) investmentScore = 1;

    if (i >= r + l + inv) balanceScore = 1;

    return Math.round(
      savingsScore +
      emergencyScore +
      leisureScore +
      investmentScore +
      balanceScore
    );
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
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white p-10">
      <div className="max-w-5xl mx-auto space-y-8">

        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {userType === "student"
              ? "Student Finance Dashboard"
              : "Personal Finance Dashboard"}
          </h1>
          <p className="text-gray-400">
            Enter your monthly details to analyze financial health
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-xl space-y-5">
            <h2 className="text-xl font-semibold">Financial Details</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Monthly Income" value={income} onChange={num(setIncome)} />
              <Input label="Recurring Costs" value={recurring} onChange={num(setRecurring)} />
              <Input label="Leisure Spending" value={leisure} onChange={num(setLeisure)} />
              <Input label="Savings" value={savings} onChange={num(setSavings)} />
              <Input label="Emergency Fund" value={emergency} onChange={num(setEmergency)} />
              <Input label="Monthly Investments" value={investment} onChange={num(setInvestment)} />
            </div>

            <button
              onClick={goToPortfolio}
              className="w-full bg-blue-600 hover:bg-blue-500 transition text-white py-3 rounded-2xl font-semibold"
            >
              Analyze Portfolio →
            </button>
          </div>

          <div className="bg-gradient-to-b from-blue-600/20 to-transparent border border-blue-500/20 backdrop-blur-xl p-8 rounded-3xl shadow-xl text-center">
            <h2 className="text-lg text-gray-300">Your Financial Score</h2>
            <div className="text-8xl font-extrabold mt-4">
              {score}
            </div>
            <p className="text-gray-400 mt-3">
              Out of 10
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | "";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="w-full bg-black/40 border border-white/10 focus:border-blue-500 outline-none p-3 rounded-xl"
      />
    </div>
  );
}

