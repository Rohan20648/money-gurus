"use client";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const stored = localStorage.getItem("portfolioData");
    if (!stored) return;
    setData(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (!data) return;

    async function fetchAdvice() {
      setLoading(true);

      const res = await fetch("/api/advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.advice) setAdvice(result.advice);
      setLoading(false);
    }

    fetchAdvice();
  }, [data]);

  if (!data) return <div className="text-white p-10">No portfolio found</div>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white p-10">
      <div className="max-w-6xl mx-auto space-y-8">

        <header>
          <h1 className="text-4xl font-extrabold">Your Financial Portfolio</h1>
          <p className="text-gray-400">
            Personalized analysis based on your inputs
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-3xl text-center">
            <h2 className="text-gray-300">Financial Health Score</h2>
            <div className="text-8xl font-extrabold mt-3">{data.score}</div>
            <p className="text-gray-400">out of 10</p>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
            <Stat title="Income" value={data.income} />
            <Stat title="Recurring" value={data.recurring} />
            <Stat title="Leisure" value={data.leisure} />
            <Stat title="Savings" value={data.savings} />
            <Stat title="Emergency" value={data.emergency} />
            <Stat title="Investment" value={data.investment} />
          </div>

        </div>

        <section className="bg-white/5 border border-white/10 p-8 rounded-3xl">
          <h3 className="text-2xl font-semibold mb-4">Smart Insights</h3>

          {loading && <p className="text-gray-400">Analyzing finances...</p>}

          <div className="space-y-4">
            {advice.map((a, i) => (
              <div
                key={i}
                className="bg-black/40 border border-white/10 p-4 rounded-xl"
              >
                {a}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-black/40 border border-white/10 p-5 rounded-2xl">
      <p className="text-gray-400">{title}</p>
      <p className="text-3xl font-bold">₹{value}</p>
    </div>
  );
}

