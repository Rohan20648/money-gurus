"use client";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white`}>
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">

        {/* HERO */}
        <section className="text-center space-y-6 animate-fade-in">
          <h1 className="text-6xl font-extrabold tracking-tight">
            Money<span className="text-green-400">Guru</span>
          </h1>

          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            A digital financial mentor that transforms everyday money decisions
            into long-term wealth discipline.
          </p>

          <Link href="/select-user">
            <button className="mt-6 px-10 py-4 rounded-xl bg-green-500 text-black font-semibold text-lg hover:scale-105 transition-transform">
              Get Started →
            </button>
          </Link>
        </section>

        {/* PROBLEM */}
        <section className="grid md:grid-cols-2 gap-10">
          <div className="bg-white/5 backdrop-blur p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition">
            <h2 className="text-2xl font-bold mb-3"> The Problem</h2>
            <p className="text-gray-300">
              Most finance apps act like digital passbooks. They show where money
              went — but not whether those decisions were smart, risky, or
              silently sabotaging the future.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition">
            <h2 className="text-2xl font-bold mb-3"> Our Insight</h2>
            <p className="text-gray-300">
              Wealth isn’t built by tracking money — it’s built by understanding
              the quality of decisions behind it.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="space-y-10">
          <h2 className="text-4xl font-bold text-center">How MoneyGuru Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: " Input Habits",
                desc: "Users enter income, expenses, savings, investments, and borrowing behavior."
              },
              {
                title: " Analyze Quality",
                desc: "We evaluate discipline, not wealth, across spending, savings, and investments."
              },
              {
                title: " Guide Action",
                desc: "A monthly Guru Score and AI mentor suggest how to improve next month."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur p-6 rounded-2xl text-center hover:-translate-y-2 transition"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* USERS */}
        <section className="grid md:grid-cols-2 gap-10">
          <div className="bg-white/5 backdrop-blur p-8 rounded-2xl hover:-translate-y-1 transition">
            <h3 className="text-2xl font-bold mb-3"> Student Mode</h3>
            <p className="text-gray-300">
              Students can borrow money only equal to their locked savings.
              Missed repayments are auto-deducted — teaching responsibility
              without financial ruin.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur p-8 rounded-2xl hover:-translate-y-1 transition">
            <h3 className="text-2xl font-bold mb-3"> Salaried Mode</h3>
            <p className="text-gray-300">
              Working professionals get insights into expense quality, savings
              discipline, credit usage, and long-term investment health.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-gray-500 text-sm pt-10">
          Built for hackathon demo • Focused on discipline, not just data
        </footer>

      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}

